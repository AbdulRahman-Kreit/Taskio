/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useRef, useEffect } from 'react'
import { TaskContext } from '../contexts/TaskProvider';

export default function Inputbuttons() {
    // We no longer need `setTasks` here, as the Provider handles that.
    const { taskValue, setTaskValue, handleAddTasks, filter, setFilter } = useContext(TaskContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside]);

    const dropdownItems = ['All Tasks', 'Complete Tasks', 'Incomplete Tasks'];

    const handleFilterChange = (selectedFilter) => {
        // We simply tell the provider which filter to use.
        setFilter(selectedFilter);
        setIsOpen(false);
    };
    
    return (
        <div className="buttonContainer">
            <button onClick={() => {
                    handleAddTasks(taskValue);
                    setTaskValue('')
                }} className="addBtn">
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button onClick={toggleDropdown} className="filterBtn">
                    <i className="fa-solid fa-filter"></i>
                </button>
                {isOpen && 
                <div className="dropdownContainer" ref={dropdownRef}>
                    <ul className="dropdownList">
                        {dropdownItems.map((item, index) => {
                            return(
                                <li key={index} 
                                    className="dropdownItem"
                                    onClick={() => {handleFilterChange(item)}}>
                                    <input type="radio" 
                                        checked={filter === item}
                                        onChange={() => {}}/>
                                    <label>{item}</label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                }
        </div>
    )
}