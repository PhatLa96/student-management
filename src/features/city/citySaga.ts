import { call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import { cityActions } from './citySlice';

function* fetchCityList() {
  try {
    const reponse: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(reponse));
  } catch (error) {
    yield put(cityActions.fetchCityListFailed("dasigydas"));
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
