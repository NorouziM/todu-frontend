import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@state/store';

// Define a type for the slice state
interface ITodo {
  data: string[] | null;
  single: object | null;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: ITodo = {
  data: null,
  single: null,
  isLoading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: 'todos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getTodos: (state, action: PayloadAction) => {
      getTodosActionCreator(action.payload);
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { getTodos, decrement, incrementByAmount } = todosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default todoSlice.reducer;
