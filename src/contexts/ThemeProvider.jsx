import React, { createContext, useState, useEffect } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    // State to store the current theme in the local storage
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || 'light';
    });
    // Effect to save the theme and update the DOM
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme])

    // Function to change the theme
    function toggleTheme() {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    }
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}
