// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Replace with your actual reducers

const store = configureStore({
  reducer: rootReducer,
});

export default store;
