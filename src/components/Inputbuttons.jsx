/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskProvider';

export default function Inputbuttons() {
    const { taskValue, setTaskValue, handleAddTasks } = useContext(TaskContext);
    
    return (
        <div className="buttonContainer">
            <button onClick={() => {
                    handleAddTasks(taskValue);
                    setTaskValue('')
                }} className="addBtn">
                    <i className="fa-solid fa-plus"></i>
                </button>
        </div>
    )
}