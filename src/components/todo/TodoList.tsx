import { type Task } from '../../features/todos/TodoTaskTypes';
import TodoItem from './TodoItem';

type TodoListProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function TodoList({ tasks, onDelete, onToggle }: TodoListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks yet! Add your first task above.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
}
