import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import movieReducer from "./reducers/movieReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  authReducer,
  movieReducer,
  userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
