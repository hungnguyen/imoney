import * as actionTypes from "./actionTypes";

//month actions
export const getAllMonth = () => ({
  type: actionTypes.GET_ALL_MONTH,
});
export const getAllMonthSuccess = (data) => ({
  type: actionTypes.GET_ALL_MONTH_SUCCESS,
  data,
});

export const getSingleMonth = (data) => ({
  type: actionTypes.GET_SINGLE_MONTH,
  data,
});
export const getSingleMonthSuccess = (data) => ({
  type: actionTypes.GET_SINGLE_MONTH_SUCCESS,
  data,
});

export const createMonth = (data) => ({
  type: actionTypes.CREATE_MONTH,
  data,
});
export const createMonthSuccess = (data) => ({
  type: actionTypes.CREATE_MONTH_SUCCESS,
  data,
});

export const updateMonth = (data) => ({
  type: actionTypes.UPDATE_MONTH,
  data,
});
export const updateMonthSuccess = (data) => ({
  type: actionTypes.UPDATE_MONTH_SUCCESS,
  data,
});

export const deleteMonth = (data) => ({
  type: actionTypes.DELETE_MONTH,
  data,
});
export const deleteMonthSuccess = () => ({
  type: actionTypes.DELETE_MONTH_SUCCESS,
});

export const selectMonth = (data) => ({
  type: actionTypes.SELECT_MONTH,
  data,
});

//expense actions
export const getAllExpense = () => ({
  type: actionTypes.GET_ALL_EXPENSE,
});
export const getAllExpenseSuccess = (data) => ({
  type: actionTypes.GET_ALL_EXPENSE_SUCCESS,
  data,
});

export const getSingleExpense = (data) => ({
  type: actionTypes.GET_SINGLE_EXPENSE,
  data,
});
export const getSingleExpenseSuccess = (data) => ({
  type: actionTypes.GET_SINGLE_EXPENSE_SUCCESS,
  data,
});

export const createExpense = (data) => ({
  type: actionTypes.CREATE_EXPENSE,
  data,
});
export const createExpenseSuccess = (data) => ({
  type: actionTypes.CREATE_EXPENSE_SUCCESS,
  data,
});

export const updateExpense = (data) => ({
  type: actionTypes.UPDATE_EXPENSE,
  data,
});
export const updateExpenseSuccess = (data) => ({
  type: actionTypes.UPDATE_EXPENSE_SUCCESS,
  data,
});

export const deleteExpense = (data) => ({
  type: actionTypes.DELETE_EXPENSE,
  data,
});
export const deleteExpenseSuccess = (data) => ({
  type: actionTypes.DELETE_EXPENSE_SUCCESS,
  data,
});

export const selectExpense = (data) => ({
  type: actionTypes.SELECT_EXPENSE,
  data,
});

export const unSelectExpense = (data) => ({
  type: actionTypes.UNSELECT_EXPENSE,
});

//log actions
export const addLog = (data) => ({
  type: actionTypes.ADD_LOG,
  data,
});
export const toggleEdit = () => ({
  type: actionTypes.TOGGLE_EDIT,
});
