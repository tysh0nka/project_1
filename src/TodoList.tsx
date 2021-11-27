import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (value: ('all'|'active'|'completed')) => void
    addTask: (title: string) => void

}
const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const changeTitle = ((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value))
    const keyEnter = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter'? addTask() : undefined
    const all = ()=> {props.changeFilter('all')}
    const active = ()=> {props.changeFilter('active')}
    const completed = ()=> {props.changeFilter('completed')}


    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>props.removeTask(task.id)}>x</button>
            </li>
        )
    })
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={keyEnter}
                    />
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={all}>All</button>
                    <button onClick={active}>Active</button>
                    <button onClick={completed}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;

