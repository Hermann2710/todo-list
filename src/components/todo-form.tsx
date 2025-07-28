import { Plus } from "lucide-react"
import { FormEvent, useState } from "react"
import useTodoContext from "../contexts/todo-context"
import { Todo } from "../types"

export default function TodoForm() {
  const { addTodo } = useTodoContext()
  const [name, setName] = useState<string>("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.length < 3) return
    const todo: Todo = {
      id: crypto.randomUUID(),
      name: name,
      complete: false,
    }
    addTodo(todo)
    setName("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off'
          placeholder='Nom de la tâche'
        />
        <button type='submit' disabled={name.length < 3}>
          <Plus />
        </button>
      </form>
    </div>
  )
}
