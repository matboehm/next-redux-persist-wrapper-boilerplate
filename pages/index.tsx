export default function Home() {
    return (
        <>
            <h1>Next.js Redux Persist Boilerplate Demo</h1>
            <br/>
            <h2>ToDo List</h2>
            <label htmlFor="todo">
                New ToDo
                <input type="text" id="todo" name="todo"/>
            </label>
            <button>Add</button>
            <br/>
            <br/>
            <ul>
                <li><strong>ToDo #1</strong> - <a >Remove</a></li>
                <li><strong>ToDo #2</strong> - <a >Remove</a></li>
                <li><strong>ToDo #3</strong> - <a >Remove</a></li>
            </ul>
        </>
    );
}
