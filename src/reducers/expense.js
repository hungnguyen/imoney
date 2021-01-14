import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: true,
  list: [],
  item: {},
};

export default function expense(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_EXPENSE:
      return { ...state, loading: true };
    case actionTypes.GET_ALL_EXPENSE_SUCCESS:
      return { ...state, loading: false, list: action.data };
    case actionTypes.GET_SINGLE_EXPENSE:
      return { ...state, loading: true };
    case actionTypes.GET_SINGLE_EXPENSE_SUCCESS:
      return { ...state, loading: false, item: action.data };
    case actionTypes.CREATE_EXPENSE:
      return { ...state, loading: true };
    case actionTypes.CREATE_EXPENSE_SUCCESS:
      return { ...state, loading: false, list: state.list.concat(action.data) };
    case actionTypes.UPDATE_EXPENSE:
      return { ...state, loading: true };
    case actionTypes.UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) =>
          item._id === action.data._id
            ? {
                ...item,
                name: action.data.name,
                amount: { $numberDecimal: action.data.amount },
              }
            : item
        ),
      };
    case actionTypes.DELETE_EXPENSE:
      return { ...state, loading: true };
    case actionTypes.DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item._id !== action.data),
      };
    case actionTypes.SELECT_EXPENSE:
      return {
        ...state,
        item: state.list.find((item) => item._id === action.data),
      };
    default:
      return state;
  }
}
