import useTodoContext from "../contexts/todo-context"
import TodoItem from "./todo-item"

export default function TodoList({ className }: { className?: string }) {
  const { todos } = useTodoContext()
  // Grouper les todos par date d'ajout (du plus récent au plus ancien)
  const groupedTodos = [...todos].reduce(
    (groups: Record<string, typeof todos>, todo) => {
      const date = todo.createdAt
      if (!groups[date]) groups[date] = []
      groups[date].push(todo)
      return groups
    },
    {}
  )
  // Obtenir les dates triées du plus récent au plus ancien
  const sortedDates = Object.keys(groupedTodos).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  return (
    <div className={`space-y-6 ${className}`}>
      {sortedDates.map((date) => (
        <div key={date}>
          <div className='font-medium mb-2'>{date}</div>
          <div className='space-y-2'>
            {groupedTodos[date].map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
