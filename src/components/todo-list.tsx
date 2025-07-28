import useTodoContext from "../contexts/todo-context"
import TodoItem from "./todo-item"

export default function TodoList({ className }: { className?: string }) {
  const { todos } = useTodoContext()
  return (
    <div className={`space-y-2 ${className}`}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  )
}
