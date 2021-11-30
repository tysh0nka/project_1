import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (value: ('all'|'active'|'completed')) => void
    addTask: (title: string) => void
    filter: 'all'|'active'|'completed'
    changeTaskStatus: (taskID: string, isDone:boolean) => void

}
const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
            setTitle('')
        } else {
            setError(true)
        }

    }
    const changeTitle = ((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    })
    const keyEnter = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter'? addTask() : undefined
    const all = ()=> {props.changeFilter('all')}
    const active = ()=> {props.changeFilter('active')}
    const completed = ()=> {props.changeFilter('completed')}


    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id} className={task.isDone ? 'is-done': ''}>
                <input type="checkbox" checked={task.isDone} onChange={(e)=> props.changeTaskStatus(task.id, e.currentTarget.checked)} />
                <span>{task.title}</span>
                <button className={'task-button'} onClick={()=>props.removeTask(task.id)}>x</button>
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
                    className={error? 'error' : ''}
                    />
                    <button onClick={addTask}>+</button>
                    <div style={{color: 'red'}}>{error && 'Title is required!'}</div>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : 'un-active'}
                            onClick={all}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter' : 'un-active'}
                        onClick={active}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : 'un-active'}
                        onClick={completed}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;

