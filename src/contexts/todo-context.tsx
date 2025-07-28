import React, { createContext, useContext, useState } from "react"
import { Todo } from "../types"

interface TodoContextType {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  removeTodo: (id: string) => void
  toggleTodo: (id: string) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (todo: Todo) => setTodos((prev) => [...prev, todo])
  const removeTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id))
  const toggleTodo = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, complete: !t.complete } : t))
    )

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export default function useTodoContext() {
  const context = useContext(TodoContext)
  if (!context)
    throw new Error("Le useTodoContext doit être utilisé dans un TodoProvider")
  return context
}
