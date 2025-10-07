import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskProvider';
import Inputbuttons from './Inputbuttons';

export default function TodoInput() {
    const { taskValue, setTaskValue } = useContext(TaskContext);
    
    return (
        // Adding Tasks Container
        <div className='addingTasksContainer'>
            <input value={taskValue} type="text" className='TaskInput' 
                onChange={(e) => {
                    setTaskValue(e.target.value)
                }} placeholder='Enter a task to do...'/>
                <Inputbuttons />
        </div>
    )
}
