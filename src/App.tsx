import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ],
    })



    const removeTask = (todoListID: string, taskID: string) => {
       const todolistTasks = tasks[todoListID]
        tasks[todoListID] = todolistTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (newTaskTitle: string, todoListID: string) => {

        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false,
        }
        setTasks({...tasks, [todoListID] : [...tasks[todoListID], newTask ] })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t=> t.id === taskID? {...t, isDone: isDone} : t)})

    };
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t=> t.id === taskID? {...t, title} : t)})

    };
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        const changeFilter = todoLists.map(t => t.id === todoListID? {...t, filter: filter} : t)
        setTodoLists(changeFilter)
    }
    const changeTitleTodo = (title: string, todoListID: string) => {
        const changeFilter = todoLists.map(t => t.id === todoListID? {...t, title} : t)
        setTodoLists(changeFilter)
    }

    const removeTodolist = (todoListID: string) => {
        setTodoLists(todoLists.filter(f=> f.id !== todoListID))
       delete tasks[todoListID]

    }

    const addTodoList = (title: string) => {
        const newTodo: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks,[newTodo.id]: []})
    }



    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(m=> {
                let tasksForRender = tasks[m.id];
                if (m.filter === 'active') {
                    tasksForRender = tasks[m.id].filter((t) => !t.isDone)
                }
                if (m.filter === 'completed') {
                    tasksForRender = tasks[m.id].filter((t) => t.isDone)
                }
                return (
                    <TodoList
                        key={m.id}
                        todoListID={m.id}
                        title={m.title}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        filter={m.filter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTitleTodo={changeTitleTodo}
                    />
                )
            })}

        </div>
    );
}

export default App;
