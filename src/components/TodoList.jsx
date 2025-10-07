import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskProvider'

export default function TodoList() {
    const { filteredTasks,  handleCheckTask, handleEditTask, handleDeleteTask } = useContext(TaskContext)

    return (
        // Main Screen
        <>
            <ul className='mainList'>
                {filteredTasks.map((task) => {
                    return(
                        <li className='listItem' key={task.id} index={task.id}>
                            <div className="textBox">
                                <input type="checkbox" 
                                    checked={task.isCompleted} 
                                    onChange={() => {handleCheckTask(task.id)}}/>
                                <p className={task.isCompleted ? `completed` : `incompleted`}>{task.text}</p>
                            </div>
                            <div className="controls">
                                {/* Edit */}
                                <button onClick={() => {handleEditTask(task.id)}}>
                                    <i className="fa-solid fa-pen-to-square edit"></i>
                                </button>
                                {/* Delete */}
                                <button onClick={() => {handleDeleteTask(task.id)}}>
                                    <i className="fa-solid fa-trash-can delete"></i>
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
