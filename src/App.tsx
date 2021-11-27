import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

function App() {

    const todoListTitle: string = 'What to learn'

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
    ])

    let [filter, setFilter] = useState<'all'|'active'|'completed'>('all');

    const removeTask = (taskID: string) => {
       const upDatedTasks = (tasks.filter(task => task.id !== taskID))
        setTasks(upDatedTasks);
    }

    const addTask = (newTaskTitle: string) => {
      const newTask: TaskType = {
          id: v1(),
          title: newTaskTitle,
          isDone: false,
      }
     setTasks([...tasks, newTask])
    }
    
    const changeFilter = (value:('all'|'active'|'completed') ) => {
      setFilter(value);
    }

    let tasksForRender = tasks;
    if(filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
