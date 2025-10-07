/* eslint-disable react-refresh/only-export-components */
import React, { useState, useId, createContext, useEffect } from 'react';

export const TaskContext = createContext();

export default function TaskProvider({ children }) {
    // Initialize the state based on localStorage or default values
    const getInitialTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        try {
            return storedTasks ? JSON.parse(storedTasks) : [];
        } catch (error) {
            console.error("Error parsing tasks from localStorage:", error);
            return [];
        }
    };

    const getInitialFilter = () => {
        const storedFilter = localStorage.getItem('filter');
        return storedFilter || 'All Tasks';
    };

    const [tasks, setTasks] = useState(getInitialTasks);
    const [filteredTasks, setFilteredTasks] = useState(getInitialTasks);
    const [taskValue, setTaskValue] = useState('');
    const [filter, setFilter] = useState(getInitialFilter);

    const generateId = useId();
    
    // Effect handles saving both tasks and filter.
    useEffect(() => {
        // Only save to localStorage if tasks or filter change.
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('filter', filter);
    }, [tasks, filter]);

    // Effect updates the displayed list whenever the main tasks
    // array or the filter changes.
    useEffect(() => {
        let newFilteredTasks = [];
        switch (filter) {
            case 'Complete Tasks':
                newFilteredTasks = tasks.filter(task => task.isCompleted);
                break;
            case 'Incomplete Tasks':
                newFilteredTasks = tasks.filter(task => !task.isCompleted);
                break;
            case 'All Tasks':
            default:
                newFilteredTasks = tasks;
                break;
        }
        setFilteredTasks(newFilteredTasks);
    }, [tasks, filter]);
    
    // --- Handler Functions ---
    // Add a new tasks
    function handleAddTasks(newTaskText) {
        const newTaskObject = {
            id: generateId + '-' + tasks.length,
            text: newTaskText,
            isCompleted: false
        };
        const newTaskList = [...tasks, newTaskObject];
        setTasks(newTaskList);
    }

    // Check the task
    function handleCheckTask(taskId) {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted,
                };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    // Edit the task
    function handleEditTask(taskId) {
        const taskToEdit = tasks.find(task => task.id === taskId);
        if (taskToEdit) {
            setTaskValue(taskToEdit.text);
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    }

    // Delete the task
    function handleDeleteTask(taskId) {
        const newTaskList = tasks.filter((task) => {
            return task.id !== taskId;
        });
        setTasks(newTaskList);
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            taskValue,
            setTaskValue,
            handleAddTasks,
            handleCheckTask,
            handleEditTask,
            handleDeleteTask,
            filter,
            setFilter,
            filteredTasks
        }}>
            {children}
        </TaskContext.Provider>
    );
}