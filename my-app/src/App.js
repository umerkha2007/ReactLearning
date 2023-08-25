import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect, useReducer } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      const fetchTasksResult = await fetchTasks();
      setTasks(fetchTasksResult);
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("https://api.npoint.io/457a6ce454bd2cbd075a");
    const data = await res.json();
    console.log(data);
    return data.tasks;
  };

  const fetchTask = async (id) => {
    const res = await fetch(
      `https://api.npoint.io/457a6ce454bd2cbd075a/tasks/${id - 1}`
    );
    const data = await res.json();
    console.log(data);
    return data.tasks;
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("delete", id);
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id
          ? {
              ...task,
              reminder: !task.reminder,
            }
          : task;
      })
    );
    fetchTask(id);
  };

  const addTask = (task) => {
    console.log(task);
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  //Reducer State
  const reducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1, showText: state.showText };
      case "ToggleShowText":
        return { count: state.count, showText: !state.showText };
      default:
        return state;
    }
  }
  const [reducerState, dispatch] = useReducer(reducer, {count: 0, showText: false})
  //Reducer State End

  // Add Task POST Request

  const addTaskPost = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const toggleAddTask = (addTaskVisible) => {
    setShowAddTask(addTaskVisible);
  };

  return (
    <Router>
      <div className="container">
        <Header
          title={"Hello"}
          onAddTaskClicked={() => toggleAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />
        <Routes>
          <Route path="/" element={
            <>
              <h3>{reducerState.count}</h3>
              <button onClick={ () => {
                  dispatch({type: "INCREMENT"});
                  dispatch({type: "ToggleShowText"});
              }} >Click to Increment</button>
              {reducerState.showText && <h2>Text only displayed if showText is true</h2>}
              {showAddTask ? <AddTask onAdd={addTask} /> : ""}
              {tasks.length === 0 ? (
                <h1>No Tasks Remaining</h1>
              ) : (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              )}
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// If class based, you can use this syntax
/*
import React, { Component } from 'react'

export class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
      </div>
    )
  }
}

export default App
*/
