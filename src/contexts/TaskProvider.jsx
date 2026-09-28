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
        return storedFilter || 'All';
    };

    const [tasks, setTasks] = useState(getInitialTasks);
    const [filteredTasks, setFilteredTasks] = useState(getInitialTasks);
    const [taskValue, setTaskValue] = useState('');
    const [filter, setFilter] = useState(getInitialFilter);
    const [inputPlaceholder, setInputPlaseholder] = useState('Currently typing...');
    // For error message
    const [isInputErrorExist, setIsInputErrorExist] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const generateId = useId();
    
    // Effect handles saving both tasks and filter.
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('filter', filter);
    }, [tasks, filter]);

    // Effect updates the displayed list whenever the main tasks
    // array or the filter changes.
    useEffect(() => {
        let newFilteredTasks = [];
        switch (filter) {
            case 'Completed':
                newFilteredTasks = tasks.filter(task => task.isCompleted);
                break;
            case 'Active':
                newFilteredTasks = tasks.filter(task => !task.isCompleted);
                break;
            case 'All':
            default:
                newFilteredTasks = tasks;
                break;
        }
        setFilteredTasks(newFilteredTasks);
    }, [tasks, filter]);
    
    // --- Handler Functions ---
    // Add a new tasks
    const handleAddTasks = (newTaskText) => {
        if (newTaskText.trim() === '') {
            setInputPlaseholder('Task name is required!');
            console.error('Task name is required!');
            setIsInputErrorExist(true);
        }
        else {
            const newTaskObject = {
                id: generateId + '-' + tasks.length + '-' + Date.now(),
                text: newTaskText,
                isCompleted: false
            };
            const newTaskList = [...tasks, newTaskObject];
            setTasks(newTaskList);
            setIsInputErrorExist(false);
        }
    }

    // Check the task
    const handleCheckTask = (taskId) => {
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
    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.id === taskId);
        if (taskToEdit) {
            setTaskValue(taskToEdit.text);
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    }

    // Delete the task
    const handleDeleteTask = (taskId) => {
        const newTaskList = tasks.filter((task) => {
            return task.id !== taskId;
        });
        setTasks(newTaskList);
    }

    // Clear all completed tasks
    const handleClearCompleted = () => {
        const activeTasks = tasks.filter(task => !task.isCompleted);
        setTasks(activeTasks);
    }

    // Drag & drop task logic
    const handleDragStart = (id) => {
        setDraggedIndex(id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (targetId) => {
        if (draggedIndex === null || draggedIndex === targetId) return;

        const draggedItemIndex = tasks.findIndex(task => task.id === draggedIndex);
        const targetItemIndex = tasks.findIndex(task => task.id === targetId);

        if (draggedItemIndex === -1 || targetItemIndex === -1) return;

        const updatedTasks = [...tasks];

        const [movedItem] = updatedTasks.splice(draggedItemIndex, 1);
        updatedTasks.splice(targetItemIndex, 0, movedItem);

        setDraggedIndex(null);
        setTasks(updatedTasks);
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
            handleClearCompleted,
            filter,
            setFilter,
            filteredTasks,
            inputPlaceholder,
            isInputErrorExist,
            handleDragStart,
            handleDragOver,
            handleDrop,
        }}>
            {children}
        </TaskContext.Provider>
    );
}