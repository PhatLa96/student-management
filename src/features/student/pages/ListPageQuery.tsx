import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/studentApi';
import axios from 'axios';
import { City, ListParams, ListResponse, Student } from 'models';
import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import StudentFiltersQuery from '../components/StudentFilterQuery';
import StudentTableQuery from '../components/StudentTableQuery';
import queryString from 'query-string';
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
  const location = useLocation();

  const [page, setPage] = useState({ _page: 1, _limit: 10 });

  const [pageCity, setPageCity] = useState(1);

  const queryparams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page as string) || 1,
      _limit: 10,
    };
  }, [location.search]);

  const match = useRouteMatch();
  const history = useHistory();

  const {
    data: dataStudent,
    refetch,
    isLoading,
  }: UseQueryResult<ListResponse<Student>> = useQuery<ListResponse<Student>>(
    ['students', page],
    () => fetchDataPagination(page),
    {
      // select: (data) : ListResponse<Student> => {
      //   const studentName = data.data.map((student) => student.name);
      //   return studentName as any ;
      // },

      // Đặt tùy chọn này để false tắt truy vấn này tự động chạy.
      enabled: true,
      // cacheTime: 0,
      //Nếu được đặt thành false, truy vấn sẽ không tìm nạp lại tiêu điểm cửa sổ.
      // refetchOnWindowFocus: false,

      // staleTime:30000 30s trước khi thành dữ liệu cũ, trong 30s này sẽ k gọi truy vấn lại, hết 30s dữ liệu sẽ trở thành cũ và sẽ gọi truy vấn lại.

      //Nếu được đặt thành true, truy vấn sẽ tìm nạp lại trên mount nếu dữ liệu cũ.
      // refetchOnMount: false,

      // refetchInterval:2000 // tự động nạp lại dữ liệu mỗi 2s

      //Nếu được đặt thành true, truy vấn sẽ tìm nạp lại khi kết nối lại nếu dữ liệu cũ
      // refetchOnReconnect: false,
      //Nếu được đặt thành true, các truy vấn được đặt thành tìm nạp liên tục bằng a refetchIntervalsẽ tiếp tục tìm nạp lại trong khi tab / cửa sổ của chúng ở chế độ nền
      // refetchIntervalInBackground: true,

      //Tùy chọn này có thể được sử dụng để biến đổi hoặc chọn một phần dữ liệu được trả về bởi hàm truy vấn.
      /**
       * select: (data)=>{
       *      const studentName = data?.data.map((student)=>student.name)
       *      return studentName
       * }
       *  */
    }
  );

  const { data: dataCity } = useQuery(['citys', pageCity], () => fetchDataCity(pageCity), {
    refetchOnWindowFocus: false,
  });

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
  const totalRow = dataStudent?.pagination?._totalRows as number;
  const limit = dataStudent?.pagination?._limit as number;

  const handlePageChange = (event: React.ChangeEvent<unknown>, pages: number) => {
    const filters = {
      ...queryparams,
      _page: pages,
    };

    setPage({ ...filters, _page: pages });

    setPageCity(1);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleRemoveStudent = async (student: Student) => {
    setDeleteId(student.id as string);
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/edit/${student.id}`);
  };
  const handleSearchChange = (newFilter: ListParams) => {
    const filters = {
      ...newFilter,
    };

    setPage(filters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterChange = (newFilter: ListParams) => {
    const filters = {
      ...newFilter,
    };

    setPage(filters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  // const handleRefetch = () => {
  //   refetch();
  // };
  // tìm nạp 1 cách thủ công

  useEffect(() => {
    setPage(queryparams);
    // refetch();
  }, [page, refetch, queryparams]);
  return (
    <Box className={classes.root}>
      {(isLoading || loadingRemove) && <LinearProgress />}
      {/* <Button onClick={handleRefetch} variant="contained" color="primary">
        fetch data
      </Button> */}
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
