import actionTypes from "../types";

const initialState = {
  adminInfo: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ADMIN_INFO:
      state.adminInfo = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
