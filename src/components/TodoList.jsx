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
                            <div className="textBox" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                                
                                {/* Frontend Mentor Custom Checkbox Container */}
                                <label className="custom-checkbox" style={{ position: 'relative', display: 'inline-block', width: '24px', height: '24px', flexShrink: 0, cursor: 'pointer' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={task.isCompleted} 
                                        onChange={() => {handleCheckTask(task.id)}}
                                        style={{ position: 'absolute', opacity: 0, cursor: 'pointer', height: 0, width: 0 }}
                                    />
                                    <span className="checkmark" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '24px',
                                        width: '24px',
                                        borderRadius: '50%',
                                        border: task.isCompleted ? 'none' : '1px solid var(--border-color)',
                                        background: task.isCompleted ? 'linear-gradient(135deg, #5df, #c058f3)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'background 0.2s, border 0.2s'
                                    }}>
                                        {task.isCompleted && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9">
                                                <path fill="none" stroke="#fff" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/>
                                            </svg>
                                        )}
                                    </span>
                                </label>

                                <p className={task.isCompleted ? `completed` : `incompleted`} style={{ margin: 0, cursor: 'pointer' }}>
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

            <div className="listFooter" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px',
                fontSize: '0.9rem',
                color: 'var(--input-placeholder)',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'var(--box-bg-color)'
            }}>
                <span>{itemsLeft} items left</span>
                
                <div className="filterButtons" style={{ display: 'flex', gap: '15px' }}>
                    {['All', 'Active', 'Completed'].map((type) => (
                        <button 
                            key={type}
                            onClick={() => setFilter(type)}
                            style={{
                                color: filter === type ? '#3a7cfd' : 'var(--input-placeholder)',
                                fontWeight: filter === type ? '700' : '400',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'color 0.2s'
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={handleClearCompleted} 
                    style={{ 
                        color: 'var(--input-placeholder)', 
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--hover-font-color)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--input-placeholder)'}
                >
                    Clear Completed
                </button>
            </div>
        </div>
    )
}