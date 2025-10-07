import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeProvider'

export default function ThemeSwitcher() {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} className='switch'>
            Switch Theme
        </button>
    )
}
