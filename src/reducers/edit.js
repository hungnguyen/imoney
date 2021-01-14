import * as actionTypes from "../actions/actionTypes";

const initState = {
  show: false,
};

export default function edit(state = initState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_EDIT:
      return { ...state, show: !state.show };
    default:
      return state;
  }
}
