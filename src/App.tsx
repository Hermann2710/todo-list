import { ListTodo } from "lucide-react"
import TodoForm from "./components/todo-form"
import TodoList from "./components/todo-list"

export default function App() {
  return (
    <div className='h-screen bg-gray-300 p-10'>
      <div className='bg-white max-w-2xl mx-auto p-3 rounded-lg shadow-lg'>
        <h1 className='flex items-center gap-2 text-2xl font-bold mb-4'>
          To-Do List <ListTodo size={30} className='text-orange-500' />
        </h1>
        <TodoForm className='mb-3' />
        <TodoList />
      </div>
    </div>
  )
}
