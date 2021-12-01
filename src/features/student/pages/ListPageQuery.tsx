import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/studentApi';
import axios from 'axios';
import { City, ListParams, Student } from 'models';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import StudentFiltersQuery from '../components/StudentFilterQuery';
import StudentTableQuery from '../components/StudentTableQuery';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const fetchDataPagination = (filter: ListParams) => {
  return studentApi.getAll(filter);
};

const fetchDataCity = (page: number) => {
  return axios.get(`http://js-post-api.herokuapp.com/api/cities?_page=${page}&_limit=10`);
};

const removeDataStudent = (id: string) => {
  return axios.delete(`http://js-post-api.herokuapp.com/api/students/${id}`);
};

export default function ListPageQuery() {
  const { t } = useTranslation();
  const [page, setPage] = useState({ _page: 1, _limit: 10 });

  const [pageCity, setPageCity] = useState(1);

  const match = useRouteMatch();
  const history = useHistory();

  const {
    data: dataStudent,

    isLoading,
  } = useQuery(['students', page], () => fetchDataPagination(page));
  const { data: dataCity } = useQuery(['citys', pageCity], () => fetchDataCity(pageCity));

  const [deleteId, setDeleteId] = useState('');

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: loadingRemove } = useMutation(removeDataStudent);

  const remove = async () => {
    await mutateAsync(deleteId);
    queryClient.invalidateQueries('students');
  };

  const classes = useStyles();
  const selectCityMap = dataCity?.data?.data?.reduce((map: { [key: string]: City }, city: City) => {
    map[city.code] = city;
    return map;
  }, {});
  const totalRow = dataStudent?.pagination._totalRows as number;
  const limit = dataStudent?.pagination._limit as number;

  const handlePageChange = (e: any, pages: number) => {
    setPage({ ...page, _page: pages });

    setPageCity(1);
  };

  const handleRemoveStudent = async (student: Student) => {
    setDeleteId(student.id as string);
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/edit/${student.id}`);
  };
  const handleSearchChange = (newFilter: any) => {
    console.log(newFilter);
    setPage(newFilter);

    console.log('Search Change Newfilter');
  };

  const handleFilterChange = (newFilter: any) => {
    setPage(newFilter);
    console.log('Search Change Newfilter');
  };
  return (
    <Box className={classes.root}>
      {(isLoading || loadingRemove) && <LinearProgress />}

      <Box mb={4} className={classes.title}>
        <Typography variant="h4">{t('Students')}</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            {t(' Add new student ')}
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <StudentFiltersQuery
          filter={page}
          cityList={dataCity?.data?.data}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Student Table */}

      <StudentTableQuery
        studentList={dataStudent?.data}
        cityMap={selectCityMap as { [key: string]: City }}
        onRemove={remove}
        handleRemoveStudent={handleRemoveStudent}
        onEdit={handleEditStudent}
      />

      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalRow / limit)}
          page={page._page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
