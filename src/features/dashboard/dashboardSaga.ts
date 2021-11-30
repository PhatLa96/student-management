import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { dashboardActions, RankingByCity } from './dashboardSlice';

function* fetchStatistics() {
  // all là gọi tất cả cùng chạy không có đợi chờ thằng nào hết , all sẽ là blocking vì cả 4 thằng trong all đều là blocking,ngược lại sẽ là non-blocking nếu 4 thằng là non-blocking
  const reponseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      gender: 'male',
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      gender: 'female',
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      mark_gte: 8, // điểm lớn hơn hoặc bằng 8
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      mark_lte: 5, // điểm nhỏ hơn hoặc bằng 5
    }),
  ]);

  const statisticsList = reponseList.map((x) => x.pagination._totalRows);

  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
  yield put(
    dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
  );
}
function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardActions.setHighestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  // fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  //fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'asc',
      city: x.code,
    })
  );
  const reponseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = reponseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data,
  }));
  //update state

  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardata() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);

    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('failed to fetch dashboard data', error);

    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardata);
}
