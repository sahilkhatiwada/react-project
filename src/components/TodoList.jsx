import TodoItem from './TodoItem'

const TodoList = ({ todos, deleteTodo, toggleComplete, updateTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  )
}

export default TodoList