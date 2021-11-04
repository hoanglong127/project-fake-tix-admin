import actionTypes from "../types";

const initialState = {
  movieList: [],
  movieInfo: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_MOVIE_LIST:
      state.movieList = payload;
      return { ...state };
    case actionTypes.SET_MOVIE_INFO:
      state.movieInfo = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
