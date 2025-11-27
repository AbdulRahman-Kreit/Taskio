import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskProvider';
import Inputbuttons from './Inputbuttons';

export default function TodoInput() {
    const { taskValue, 
            setTaskValue, 
            inputPlaceholder, 
            isInputErrorExist } = useContext(TaskContext);
    
    return (
        // Adding Tasks Container
        <div className='addingTasksContainer'>
            <input value={taskValue} type="text" 
                className={isInputErrorExist === true ? 'errorMsg' : 'TaskInput'} 
                onChange={(e) => {
                    setTaskValue(e.target.value)
                }} placeholder={inputPlaceholder}/>
                <Inputbuttons />
        </div>
    )
}
