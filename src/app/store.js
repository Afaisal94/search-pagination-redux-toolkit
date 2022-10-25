import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import postSlice from '../features/postSlice';

export const store = configureStore({
  reducer: {
    post: postSlice,
  },
});
