import React from 'react';
import { TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, id: string) => void
    changeFilter: (value: ('all' | 'active' | 'completed'), id: string) => void
    addTask: (title: string, id: string) => void
    filter: 'all' | 'active' | 'completed'
    changeTaskStatus: (taskID: string, isDone: boolean, id: string) => void
    todoListID: string
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTitleTodo: (title: string, todoListID: string)=> void
}
const TodoList = (props: PropsType) => {
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const all = () => {
        props.changeFilter('all', props.todoListID)
    }
    const active = () => {
        props.changeFilter('active', props.todoListID)
    }
    const completed = () => {
        props.changeFilter('completed', props.todoListID)
    }

    const changeTitleTodo = (newTitle:string) => {
      props.changeTitleTodo(newTitle, props.todoListID)
    }

    const tasksJSX = props.tasks.map(task => {
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle, props.todoListID)
        }
        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={task.isDone}
                       onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)}/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button className={'task-button'} onClick={() => props.removeTask(props.todoListID, task.id)}>x</button>
            </li>
        )
    })
    return (
        <div>
            <div>
                <h3><EditableSpan title={props.title} changeTitle={changeTitleTodo}/>
                    <button onClick={() => props.removeTodolist(props.todoListID)}>x</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : 'un-active'}
                            onClick={all}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : 'un-active'}
                            onClick={active}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : 'un-active'}
                            onClick={completed}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;

