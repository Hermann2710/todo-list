import TodoForm from "./components/todo-form"
import TodoList from "./components/todo-list"

export default function App() {
  return (
    <div className='h-screen bg-gray-300 p-10'>
      <div className='bg-white max-w-2xl self-center'>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  )
}
