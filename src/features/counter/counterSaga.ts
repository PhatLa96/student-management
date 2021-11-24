import { delay, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('waiting 1s');

  yield delay(1000);

  console.log('waiting done, dispatch action');

  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  // lắng nghe tất cả các dispatch có pattern(incrementSaga.toString()), dispatch bao nhiêu lần thì gọi lại bấy nhiêu lần
  //   yield takeEvery(incrementSaga.toString(), handleIncrementSaga);

  // lắng nghe những dispatch có pattern(incrementSaga.toString()),dispatch bao nhiêu lần thì chỉ lấy thằng cuối cùng hủy bỏ thằng đang chạy nếu k có thời gian chạy xong khi dispatch liên tục
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
