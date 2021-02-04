import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as expenseApi from "../api/expenseApi";
import * as actionTypes from "../actions/actionTypes";

function* getAll() {
  try {
    const res = yield call(expenseApi.getAll);
    yield put(actions.getAllExpenseSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* getSingle(action) {
  try {
    const res = yield call(expenseApi.getSingle, action.data);
    yield put(actions.getSingleExpenseSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* create(action) {
  try {
    const res = yield call(expenseApi.create, action.data);
    yield put(actions.createExpenseSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* update(action) {
  try {
    const res = yield call(expenseApi.update, action.data);
    yield put(actions.updateExpenseSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* remove(action) {
  try {
    yield call(expenseApi.remove, action.data);
    yield put(actions.deleteExpenseSuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

export default function* expenseSaga() {
  yield takeLatest(actionTypes.GET_ALL_EXPENSE, getAll);
  yield takeLatest(actionTypes.GET_SINGLE_EXPENSE, getSingle);
  yield takeLatest(actionTypes.CREATE_EXPENSE, create);
  yield takeLatest(actionTypes.UPDATE_EXPENSE, update);
  yield takeLatest(actionTypes.DELETE_EXPENSE, remove);
}
