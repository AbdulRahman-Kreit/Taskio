import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskProvider'

export default function TodoList() {
    const { tasks, filteredTasks, filter, setFilter, handleCheckTask, handleEditTask, handleDeleteTask, handleClearCompleted } = useContext(TaskContext)

    // Calculate how many items are left (uncompleted)
    const itemsLeft = tasks.filter(task => !task.isCompleted).length;

    return (
        <div className='mainList'>
            <ul>
                {filteredTasks.map((task) => {
                    return (
                        <li className='listItem' key={task.id} index={task.id}>
                            <div className="textBox">
                                
                                {/* Frontend Mentor Custom Checkbox Container */}
                                <label className="custom-checkbox">
                                    <input 
                                        type="checkbox" 
                                        checked={task.isCompleted} 
                                        onChange={() => {handleCheckTask(task.id)}}
                                    />
                                    <span className="checkmark">
                                        {task.isCompleted && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9">
                                                <path fill="none" stroke="#fff" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/>
                                            </svg>
                                        )}
                                    </span>
                                </label>

                                <p className={task.isCompleted ? `completed` : `incompleted`}>
                                    {task.text}
                                </p>
                            </div>
                            <div className="controls">
                                {/* Edit */}
                                <button onClick={() => {handleEditTask(task.id)}}>
                                    <i className="fa-solid fa-pen-fancy edit"></i>
                                </button>
                                {/* Delete */}
                                <button onClick={() => {handleDeleteTask(task.id)}}>
                                    <i className="fa-solid fa-xmark delete"></i>
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>

            <div className="listFooter">
                <span>{itemsLeft} items left</span>
                
                <div className="filterButtons">
                    {['All', 'Active', 'Completed'].map((type) => (
                        <button 
                            key={type}
                            onClick={() => setFilter(type)}
                            className={filter === type ? 'filterBtnActive' : 'filterBtnInactive'}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={handleClearCompleted} 
                    className="clearBtn"
                >
                    Clear Completed
                </button>
            </div>
            
        </div>
    )
}