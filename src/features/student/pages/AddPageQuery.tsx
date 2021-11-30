import { Box, LinearProgress, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

const addDataStudent = (data: Student) => {
  return studentApi.add(data);
};
export default function AddPageQuery() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();

  const { mutateAsync, isLoading: loadingAdd } = useMutation(addDataStudent);

  useEffect(() => {
    if (!studentId) return;
  }, [studentId]);

  const handleStudentFormSubmit = async (data: Student) => {
    //TODO:handle submit here

    await mutateAsync({ ...data });

    // Toast success

    toast.success('Save student successfully');

    // throw new Error('íauhdiasuh');
    // Redirect back to student list
    history.push('/admin/query');
  };

  return (
    <Box>
      {loadingAdd && <LinearProgress />}
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> &nbsp;Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">Add new student</Typography>

      <Box mt={3}>
        <StudentForm onSubmit={handleStudentFormSubmit} />
      </Box>
    </Box>
  );
}
