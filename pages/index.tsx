import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, removeTodo, selectAllTodos, TodoType, toggleCompleted} from "@/store/todoSlice";
import {v4 as uuidv4} from 'uuid';

export default function Home() {
    const dispatch = useDispatch();
    const todos = useSelector(selectAllTodos);
    const [todoText, setTodoText] = useState('');

    const handleNewTodo = () => {
        const todo: TodoType = {
            id: uuidv4(),
            todo: todoText,
            completed: false,
            userId: 1,
        }

        dispatch(addTodo(todo));
    }

    const handleRemoveTodo = (id: string) => {
        dispatch(removeTodo(id));
    }

    const handleToggleTodo = (id: string) => {
        dispatch(toggleCompleted(id));
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
                {todos.map((todo) => {
                    return <li key={todo.id}>
                        <label htmlFor={todo.id} className={`inline ${todo.completed ? 'strikethrough' : ''}`}>
                            <input type="checkbox"
                                   id={todo.id}
                                   name={todo.id}
                                   onChange={() => handleToggleTodo(todo.id)}/>
                            <strong>{todo.todo}</strong>
                        </label> - <a href="#" onClick={() => handleRemoveTodo(todo.id)}>Remove</a>
                    </li>
                })}
            </ul>
        </>
    );
}
