import { all } from "redux-saga/effects";
import monthSaga from "./monthSaga";
import expenseSaga from "./expenseSaga";

export default function* rootSaga() {
  yield all([monthSaga(), expenseSaga()]);
}
