import type { Task } from './TodoItem'
type TodoListProps = {
  tasks : Task[];
}
export default function TodoList({tasks}: TodoListProps) {
  return(
    <ul>
          {tasks.map((tasks) => (
            <li key={tasks.id}>{tasks.title}</li>
          ))}
    </ul>
  )

}

;
