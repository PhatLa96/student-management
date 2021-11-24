import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const reponse: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(reponse));
  } catch (error) {
    console.log('error', error);
    yield put(studentActions.fetchStudentListFailed('ádkhu'));
  }
}

function* handleSearchDebouce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}
export default function* studentSaga() {
  //watch fetch student action

  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);

  yield debounce(500, studentActions.setFilterWithDebouce.type, handleSearchDebouce);
}
