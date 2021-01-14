import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: true,
  list: [],
  item: {},
};

export default function month(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_MONTH:
      return { ...state, loading: true };
    case actionTypes.GET_ALL_MONTH_SUCCESS:
      return { ...state, loading: false, list: action.data };
    case actionTypes.GET_SINGLE_MONTH:
      return { ...state, loading: true };
    case actionTypes.GET_SINGLE_MONTH_SUCCESS:
      return { ...state, loading: false, item: action.data };
    case actionTypes.CREATE_MONTH:
      return { ...state, loading: true };
    case actionTypes.CREATE_MONTH_SUCCESS:
      return { ...state, loading: false, list: state.list.concat(action.data) };
    case actionTypes.UPDATE_MONTH:
      return { ...state, loading: true };
    case actionTypes.UPDATE_MONTH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) =>
          item._id === action.data._id
            ? {
                ...item,
                name: action.data.name,
                income: { $numberDecimal: action.data.income },
              }
            : item
        ),
      };
    case actionTypes.DELETE_MONTH:
      return { ...state, loading: true };
    case actionTypes.DELETE_MONTH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item._id !== action.data),
      };
    case actionTypes.SELECT_MONTH:
      return {
        ...state,
        item: state.list.find((item) => item._id === action.data),
      };
    default:
      return state;
  }
}
