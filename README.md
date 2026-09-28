# 📝 Taskio

A sleek, responsive, and feature-rich Todo Application built with **React** and **Context API**. This project allows users to manage their daily tasks efficiently with full persistence and theme customization.

---

## ✨ Features

- ** Task Management:**
  - **Add Tasks:** Quick and easy creation of new tasks with error handling for empty inputs.
  - **Edit Tasks:** Update existing task text directly.
  - **Delete Tasks:** Remove individual tasks seamlessly.
  - **Toggle Completion:** Mark tasks as completed or active with a custom checkbox UI.
  - **Clear Completed:** Remove all finished tasks with a single click.

- **🔍 Smart Filtering:**
  - Filter tasks by status: **All**, **Active**, and **Completed**.
  - Dynamic count of remaining active items.

- **🖐️ Drag & Drop Reordering:**
  - Reorder your task list intuitively using native HTML5 Drag and Drop events.

- **🌗 Dark / Light Theme Switcher:**
  - Toggle between dark and light modes with seamless CSS variable-based transitions.

- **💾 Data Persistence:**
  - All tasks and filter preferences are automatically saved in `localStorage`, so your data stays intact even after refreshing the page.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Hooks, Context API)
- **Styling:** Pure CSS / CSS Variables (Custom Dark/Light Themes)
- **Icons:** FontAwesome
- **Storage:** Browser `localStorage`

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/AbdulRahman-Kreit/Taskio.git](https://github.com/AbdulRahman-Kreit/Taskio.git)

2. **Navigate into the project directory**
    cd todo-app

3. **Install dependencies** 
    npm install

4. **Start the development server**
    npm start
    # or for Vite projects:
    npm run dev