
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
debugger;
const store = configureStore({
  
  reducer: {
    todos: todosReducer,
  },
  
});

export default store;
