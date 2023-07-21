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
                <li><label htmlFor="todo1" className="inline"><input type="checkbox" id="todo1" name="todo1" /><strong>ToDo #1</strong></label> - <a>Remove</a></li>
                <li><label htmlFor="todo2" className="inline"><input type="checkbox" id="todo2" name="todo2" /><strong>ToDo #2</strong></label> - <a>Remove</a></li>
                <li><label htmlFor="todo3" className="inline"><input type="checkbox" id="todo3" name="todo3" /><strong>ToDo #3</strong></label> - <a>Remove</a></li>
            </ul>
        </>
    );
}
