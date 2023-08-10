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
            <p>
                Welcome to the ToDo List demo! This example demonstrates the usage of <strong>Redux</strong> and <strong>Redux Persist</strong>. In the ToDo List below, you'll find a list of your current ToDos. You can add new ToDos by clicking the "New ToDo" button. The added ToDos will be stored in the <strong>Redux store</strong>, and even if you refresh the page or close the browser, the ToDos will <strong>persist</strong> thanks to Redux Persist.
            </p>
            <p>
                To get started:
            </p>
            <ul>
                <li>Click the "New ToDo" button to open a prompt.</li>
                <li>Enter the description of your new ToDo and click "OK".</li>
                <li>Your new ToDo will be added to the list below.</li>
            </ul>
            <p>
                You can experiment with adding multiple ToDos and observe how they persist even after closing the browser or refreshing the page. This showcases the power of Redux Persist in maintaining state across sessions.
            </p>
            <p>
                Feel free to explore the code in this project to learn how Redux and Redux Persist are integrated. If you're new to these concepts, this project serves as a great starting point to understand how state management and persistence work in a Next.js application.
            </p>
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
