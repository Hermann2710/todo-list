import { CheckCheck, Square } from "lucide-react"
import { Todo } from "../types"

type TodoItemProps = {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
      <span>{todo.name}</span>
      <button>{todo.complete ? <CheckCheck /> : <Square />}</button>
    </div>
  )
}
