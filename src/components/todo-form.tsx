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
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    }
    addTodo(todo)
    setName("")
  }

  return (
    <div className={className}>
      <form
        className='flex bg-gray-100 rounded-2xl overflow-hidden'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off'
          placeholder='Nom de la tâche'
          className='px-3 py-2 flex-1 focus:outline-none'
        />
        <button
          className='bg-orange-500 rounded-2xl hover:bg-orange-600 px-5 text-white font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-300'
          type='submit'
          disabled={name.length < 3}
        >
          Ajouter
        </button>
      </form>
    </div>
  )
}
