import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { useHistory, useRouteMatch } from 'react-router';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default function ListPage() {
  const match = useRouteMatch();
  const history = useHistory();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    console.log('Search Change Newfilter');
    dispatch(studentActions.setFilterWithDebouce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    console.log('Search Change Newfilter');
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      // Remove student API
      await studentApi.remove(student.id || '');

      toast.success('Remove student successfully');
      // Trigger to re-fetch student list with current filter
      // y chang thằng cũ nhưng tạo tham chiếu mới thì mới fetch lại studentList được
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log('failed to fetch student');
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/edit/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress />}

      <Box mb={4} className={classes.title}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Student Table */}

      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
        onEdit={handleEditStudent}
      />

      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
