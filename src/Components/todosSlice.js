import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  axios from 'axios'

export const toggleTodoCompletedAsync = createAsyncThunk(
  'todos/toggleTodoCompleted',
  async (updatedTodo) => {
    const response = await axios.put(`http://localhost:3000/tasks/${updatedTodo.id}`, updatedTodo);
    return response.data;
  }
);

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch(' http://localhost:3000/tasks');
  const data = await response.json();
  return data;
});


export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, title}) => {
    
      const existingTodo = await axios.get(`http://localhost:3000/tasks/${id}`);
      const updatedTodo = {
        ...existingTodo.data,
        title
      };

      const response = await axios.put(`http://localhost:3000/tasks/${id}`, updatedTodo);
      return response.data;
   
  }
);

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id) =>
 {   
  const response = await axios.delete(`http://localhost:3000/tasks/${id}`);  
   return response.data; 
  }); 

  debugger;
const todosSlice = createSlice({
  
      name: 'todos',
      initialState: {
      todos: [],
      status: 'idle',
      error: null,
    },
    reducers: {toggleTodoCompleted: (state, action) => {
      const { id, completed } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.completed = completed;
      }
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTodos.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(updateTodoAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateTodoAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.todos = state.todos.map((todo) =>
            todo.id === action.payload.id ? action.payload : todo
          );
        })
        .addCase(updateTodoAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(toggleTodoCompletedAsync.fulfilled, (state, action) => {
          const updatedTodo = action.payload;
          state.status = 'succeeded';
          state.todos = state.todos.map((todo) =>
            todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
          );
        });
      },
    });
  //   },
  // });
  
  
export const { toggleTodoCompleted } = todosSlice.actions;
export default todosSlice.reducer;