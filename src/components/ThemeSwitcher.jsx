import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeProvider'

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} className='switch'>
            {theme === 'dark' ? 
                <i className="fa-regular fa-sun"></i> : 
                <i className="fa-regular fa-moon"></i>}
        </button>
    )
}
