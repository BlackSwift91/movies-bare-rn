import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './movieSlice';

const rootReducer = combineReducers({
  userReducer,
  movieReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
