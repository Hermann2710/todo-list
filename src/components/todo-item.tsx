import { Check, Square, Trash } from "lucide-react"
import { Todo } from "../types"
import useTodoContext from "../contexts/todo-context"

type TodoItemProps = {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, removeTodo } = useTodoContext()

  const handleToggle = () => {
    toggleTodo(todo.id)
  }
  const handleDelete = () => {
    removeTodo(todo.id)
  }

  return (
    <div>
      <button onClick={handleToggle}>
        {todo.complete ? <Check /> : <Square />}
      </button>
      <span>{todo.name}</span>
      <button onClick={handleDelete}>
        <Trash />
      </button>
    </div>
  )
}
