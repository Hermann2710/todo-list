import useTodoContext from "../contexts/todo-context"
import TodoItem from "./todo-item"

export default function TodoList() {
  const { todos } = useTodoContext()
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  )
}
