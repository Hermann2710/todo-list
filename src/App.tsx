import TodoForm from "./components/todo-form"
import TodoList from "./components/todo-list"

export default function App() {
  return (
    <div>
      <div>
        <TodoForm />
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  )
}
