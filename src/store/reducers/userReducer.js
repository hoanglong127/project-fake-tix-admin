import actionTypes from "../types";

const initialState = {
  userList: [],
  userTypeList: [],
  userInfo: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER_LIST:
      state.userList = payload;
      return { ...state };
    case actionTypes.SET_USER_TYPE_LIST:
      state.userTypeList = payload;
      return { ...state };
    case actionTypes.SET_USER_INFO:
      state.userInfo = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
