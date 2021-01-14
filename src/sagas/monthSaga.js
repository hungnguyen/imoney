import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as monthApi from "../api/monthApi";
import * as actionTypes from "../actions/actionTypes";

function* getAll() {
  try {
    const res = yield call(monthApi.getAll);
    yield put(actions.getAllMonthSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* getSingle(action) {
  try {
    const res = yield call(monthApi.getSingle, action.data);
    yield put(actions.getSingleMonthSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* create(action) {
  try {
    const res = yield call(monthApi.create, action.data);
    yield put(actions.createMonthSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* update(action) {
  try {
    const res = yield call(monthApi.update, action.data);
    yield put(actions.updateMonthSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* remove(action) {
  try {
    yield call(monthApi.remove, action.data);
    yield put(actions.deleteMonthSuccess);
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

export default function* monthSaga() {
  yield takeLatest(actionTypes.GET_ALL_MONTH, getAll);
  yield takeLatest(actionTypes.GET_SINGLE_MONTH, getSingle);
  yield takeLatest(actionTypes.CREATE_MONTH, create);
  yield takeLatest(actionTypes.UPDATE_MONTH, update);
  yield takeLatest(actionTypes.DELETE_MONTH, remove);
}
