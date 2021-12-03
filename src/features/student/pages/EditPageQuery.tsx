import { Box, LinearProgress, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import axios from 'axios';
import { Student } from 'models';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

const fetchStudentById = (id: string) => {
  return axios.get(`http://js-post-api.herokuapp.com/api/students/${id}`);
};
const updateDataStudent = (data: Student) => {
  return studentApi.update(data);
};

export default function EditPageQuery() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();

  const { data: dataStudent } = useQuery(['studentById', studentId], () =>
    fetchStudentById(studentId)
  );

  const { mutateAsync, isLoading: loadingUpdate } = useMutation(updateDataStudent);

  const queryClient = useQueryClient();

  const handleStudentFormSubmit = async (data: Student) => {
    //TODO:handle submit here

    console.log(data);
    await mutateAsync({ ...data });
    queryClient.invalidateQueries('studentById');

    // Toast success

    toast.success('Save student successfully');

    history.push('/admin/query');
  };

  return (
    <Box>
      {loadingUpdate && <LinearProgress />}
      <Link to="/admin/query">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> &nbsp;Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">Update student info</Typography>

      {Boolean(dataStudent?.data) && (
        <Box mt={3}>
          <StudentForm initialValues={dataStudent?.data} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
