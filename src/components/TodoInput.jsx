import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskProvider';
import Inputbuttons from './Inputbuttons';

export default function TodoInput() {
    const { taskValue, 
            setTaskValue, 
            handleAddTasks,
            inputPlaceholder, 
            isInputErrorExist } = useContext(TaskContext);
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTasks(taskValue);
            setTaskValue('');
        }
    };

    return (
        <div className='addingTasksContainer' style={{ position: 'relative' }}>
            <input 
                value={taskValue} 
                type="text" 
                className={isInputErrorExist === true ? 'errorMsg' : 'TaskInput'} 
                onChange={(e) => {
                    setTaskValue(e.target.value)
                }} 
                onKeyDown={handleKeyDown}
                placeholder={inputPlaceholder}
            />
            <div style={{
                
            }}>
                <Inputbuttons />
            </div>
        </div>
    )
}