import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export type TodoType  = {
    id: string;
    text: string;
    done: boolean;
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
        updateTodo(state, action) {
            const todos = Array.from(state);
            const index = todos.findIndex(todo => action.payload.id === todo.id);
            state.splice(index, 1, action.payload);
        },
        removeTodo(state, action) {
            const todos = Array.from(state);
            const index = todos.findIndex(todo => action.payload === todo.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
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

export const {addTodo, updateTodo, removeTodo} = todoSlice.actions;

export const selectAllTodos = (state: AppState) => state.todos;

export default todoSlice;
