import { Plus } from "lucide-react"
import { FormEvent, useState } from "react"

export default function TodoForm() {
  const [name, setName] = useState<string>("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        <button type='submit'>
          <Plus />
        </button>
      </form>
    </div>
  )
}
