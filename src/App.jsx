import TodoList from "./components/TodoList"
import TodoInput from "./components/TodoInput"
import TaskProvider from "./contexts/TaskProvider"
import ThemeProvider from "./contexts/ThemeProvider"
import ThemeSwitcher from "./components/ThemeSwitcher"

function App() {
  

  return (
    <ThemeProvider>
      <div className="container">
        <div className="switchBox">
          <ThemeSwitcher />
        </div>
        <div className="headerSection">
            <h1 className="appTitle">
                Taskio
            </h1>
        </div>
        <TaskProvider>
          <TodoInput />
          <TodoList/>
        </TaskProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
