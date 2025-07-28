import { Todo } from "../types"
import TodoItem from "./todo-item"

const todos: Todo[] = [{ id: "yo", name: "yo", complete: false }]

export default function TodoList() {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  )
}
