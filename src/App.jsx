import { useState } from 'react'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'
import ScientificCalculator from './pages/ScientificCalculator'
import DigitalClock from './pages/DigitalClock'
import TicTacToe from './pages/TicTacToe'
import Counter from './pages/Counter'
import TaskManager from './pages/TaskManager'

/**
 * The main App component.
 *
 * This component renders the app's UI. It holds the state of the app's todos
 * and provides functions to add, delete, toggle completion, and update todos.
 *
 * @returns {JSX.Element} The app's UI.
 */
function App() {
  const [todos, setTodos] = useState([])

  /**
   * Adds a new todo with the given text to the list of todos.
   * @param {string} text The text of the new todo.
   */
  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),
      text,
      completed: false
    }])
  }

  /**
   * Deletes the todo with the given id from the list of todos.
   * @param {number} id The id of the todo to delete.
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
    
  }

/**
 * Toggles the completion status of the todo with the given id.
 * @param {number} id The id of the todo to toggle.
 */

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ))
  }

  /**
   * Updates the text of the todo with the given id to the given new text.
   *
   * @param {number} id The id of the todo to update.
   * @param {string} newText The new text of the todo.
   */
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, text: newText} : todo
    ))
  }

  return (








    <div className="app">
      <Header />
      <div className="container">
        <TodoForm addTodo={addTodo} />
        <TodoList 
          todos={todos} 
          deleteTodo={deleteTodo} 
          toggleComplete={toggleComplete} 
          updateTodo={updateTodo}
        />
      </div>
      <TicTacToe/>
<DigitalClock/>
      <ScientificCalculator/>
      <Counter/>
<TaskManager/>






    </div>
  )
}

export default App