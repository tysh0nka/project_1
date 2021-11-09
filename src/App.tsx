import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

function App() {
    const todoListTitle_1: string = 'What to learn'
    const todoListTitle_2: string = 'What to buy'
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 1, title: "CSS", isDone: true},
        {id: 1, title: "REACT", isDone: false}
    ];
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Meat", isDone: true},
        {id: 1, title: "Beer", isDone: true},
        {id: 1, title: "Milk", isDone: false}
    ];
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
