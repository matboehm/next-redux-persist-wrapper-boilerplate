import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export type TodoType  = {
    id: string;
    todo: string;
    completed: boolean;
    userId: number;
}

export type TodoState = Array<TodoType>;

const initialState: TodoState = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.push(action.payload);
        },
        toggleCompleted(state, action) {
            const todo = state.find((todo) => todo.id === action.payload);
            todo.completed = !todo.completed;
        },
        removeTodo(state, action) {
            return state.filter(todo => todo.id !== action.payload);
        },
    },
    // Reducer for hydrating the state. Needed for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.todos,
            };
        },
    }
});

export const {addTodo, toggleCompleted, removeTodo} = todoSlice.actions;

export const selectAllTodos = (state: AppState) => state.todos;

export default todoSlice;
