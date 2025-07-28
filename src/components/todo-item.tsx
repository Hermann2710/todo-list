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
    <div className='flex items-center justify-between'>
      <div className='flex-1 flex items-center gap-2'>
        <button className='cursor-pointer' onClick={handleToggle}>
          {todo.complete ? (
            <Check className='text-orange-500' />
          ) : (
            <Square className='text-gray-500' />
          )}
        </button>
        <span className={todo.complete ? "line-through" : undefined}>
          {todo.name}
        </span>
      </div>
      <button className='text-red-500 cursor-pointer' onClick={handleDelete}>
        <Trash />
      </button>
    </div>
  )
}
