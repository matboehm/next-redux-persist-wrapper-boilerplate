import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, selectAllTodos, TodoType} from "@/store/todoSlice";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const dispatch = useDispatch();
    const todos = useSelector(selectAllTodos);
    const [todoText, setTodoText] = useState('');

    const handleNewTodo = () => {
        const todo: TodoType = {
            id: uuidv4(),
            text: todoText,
            done: false,
        }

        dispatch(addTodo(todo));
    }

    return (
        <>
            <h1>Next.js Redux Persist Boilerplate Demo</h1>
            <br/>
            <h2>ToDo List</h2>
            <label htmlFor="todo">
                New ToDo
                <input type="text" id="todo" name="todo" onChange={(event) => setTodoText(event.target.value)}/>
            </label>
            <button onClick={handleNewTodo}>Add</button>
            <br/>
            <br/>
            <ul>
                { todos.map((todo) => {
                    return <li key={todo.id}><label htmlFor={todo.id} className="inline"><input type="checkbox" id={todo.id} name={todo.id} /><strong>{todo.text}</strong></label> - <a>Remove</a></li>
                })}
         </ul>
        </>
    );
}
