import { Plus } from "lucide-react"
import { FormEvent, useState } from "react"
import useTodoContext from "../contexts/todo-context"
import { Todo } from "../types"

export default function TodoForm({ className }: { className?: string }) {
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
    <div className={className}>
      <form className='flex items-center p-2' onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off'
          placeholder='Nom de la tâche'
          className='flex-1 border'
        />
        <button
          className='bg-green-500 text-white px-3 py-1 font-medium rounded-r-lg'
          type='submit'
          disabled={name.length < 3}
        >
          Ajouter
        </button>
      </form>
    </div>
  )
}
