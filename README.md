# React Todo List App

A simple **React-based Todo List application** that uses localStorage to persist tasks even after refreshing the browser.  
The app allows users to add, view, and delete tasks, while displaying the current date and time.

---

## Features

- **Add tasks** via an input field  
- **Prevent duplicate tasks**  
- **Delete individual tasks**  
- **Delete all tasks at once**  
- **Persistent storage** using browser localStorage  
- **Live clock** that updates every second  
- Clean UI with React Icons  

---

## Tech Stack

- **React** (useState, useEffect)  
- **React Icons** (`MdCheck`, `MdDelete`)  
- **CSS** for custom styling  
- **localStorage** for persistence  

---

## How It Works

1. When a task is added:
   - It is stored in the `task` state and synced to localStorage.
   - Empty or duplicate tasks are not allowed.

2. On page reload:
   - The app fetches tasks from localStorage and initializes the list.

3. Tasks can be:
   - Deleted individually
   - Cleared entirely with a single button

4. The current date and time are updated every second using `setInterval`.

---

## Code Snippet

```javascript
// Save updated task list to localStorage (runs on every render)
localStorage.setItem("todo", JSON.stringify(task))

// Delete a single task by index
const handleDelete = (ind) => {
    setTask(prevTask => prevTask.filter((_, i) => i !== ind));
};
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-todo-list.git
   cd react-todo-list
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```
4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

---

## Project Structure

```
src/
  ├── components/
  │     └── Todo.jsx
  ├── styles/
  │     └── todo.css
  ├── App.js
  └── index.js
```

---

## Sample UI

- **Main features:**
  - Input field to add tasks  
  - List displaying all tasks with delete buttons  
  - "Delete All" button at the footer  
  - Clock showing real-time updates  

---

## Future Improvements

- Add **task completion toggle** with checkbox or strike-through style  
- Add **filtering (All / Completed / Pending)**  
- Add **animations** for adding/removing tasks  

---

## License

This project is free to use and modify for learning purposes.
