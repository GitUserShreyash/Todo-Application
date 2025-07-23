import './todo.css'
import { useState, useEffect } from "react"
import { MdCheck, MdDelete } from "react-icons/md";

export const Todo = () => {

    // Retrieve and parse the data from localStorage
    const parss = JSON.parse(localStorage.getItem("todo"))

    // Use a temporary flag to determine if data exists
    let temp = null;
    if (parss) { temp = true; }

    // State to manage the current input value
    const [inputValue, setInputValue] = useState({
        id: "",
        content: "",
        checked: false
    });

    // Main task state - initialize with localStorage data if available
    const [task, setTask] = useState(temp ? parss : []);

    // Date and time string for header
    const [datetime, setDatetime] = useState("");

    // Debugging: log the parsed localStorage data whenever task changes
    // useEffect(() => {
    //     console.log(parss)
    // }, [task]);

    // Handle changes to the input field
    const handleInputChange = (value) => {
        setInputValue({ id: value, content: value, checked: false });
    }

    // Save updated task list to localStorage (runs on every render)
    localStorage.setItem("todo", JSON.stringify(task))

    // Handle form submission to add a new task
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh

        // Don't allow empty tasks
        if (!inputValue.content) return;

        // Check if task already exists
        const isInputValueIncludes = task.find((curTask) =>
            curTask.content === inputValue.content);

        if (isInputValueIncludes) {
            // Clear input if task already exists
            setInputValue({ id: "", content: "", checked: false });
            return;
        }

        // Add the new task to the list
        setTask((prevTask) => [
            ...prevTask,
            {
                id: inputValue.content,
                content: inputValue.content,
                value: false
            }
        ]);

        // Reset the input field
        setInputValue({ id: "", content: "", checked: false })
    }

    // Update the clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString();
            const formattedTime = now.toLocaleTimeString();
            setDatetime(`${formattedDate} - ${formattedTime}`);
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, []);

    // Delete a single task by index
    const handleDelete = (ind) => {
        setTask(prevTask => prevTask.filter((_, i) => i !== ind));
    };

    // Clear all tasks
    const handleAllDelete = () => {
        setTask([]);
    }

    return (
        <div className='main'>
            {/* Header with title and time */}
            <header className='header'>
                <h1>Todo List</h1>
                <h2 className='date-time'>{datetime}</h2>
            </header>

            {/* Task input form */}
            <section>
                <form onSubmit={(e) => handleFormSubmit(e)} className='form'>
                    <div>
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            value={inputValue.content}
                            onChange={(e) => { handleInputChange(e.target.value) }}
                        />
                    </div>
                    <div>
                        <button type="submit" className="todo-btn">
                            Add Task
                        </button>
                    </div>
                </form>
            </section>

            {/* Task list */}
            <section>
                <ul className='list'>
                    {
                        task.map((CurEle, index) => {
                            return (
                                <li key={index} className='task-list'>
                                    <div className='task'>{CurEle.content}</div>
                                    <button className='check-btn'>
                                        <MdCheck size={25} color="green" />
                                    </button>
                                    <button className='delete-btn' onClick={() => handleDelete(index)}>
                                        <MdDelete size={25} color="red" />
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>

            {/* Delete all button */}
            <section className='footer'>
                <button onClick={handleAllDelete} className='del-all-btn'>
                    Delete All
                </button>
            </section>
        </div>
    )
}
