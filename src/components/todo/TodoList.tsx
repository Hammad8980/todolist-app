import { type PropsWithChildren } from 'react';
import { type Task } from '../../features/todos/TodoTaskTypes';

type TodoItemProps = PropsWithChildren<{
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}>;

export default function TodoItem({ task, onDelete, onToggle, children }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2 py-2 border-b">
      <input 
        type="checkbox" 
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5"
      />
      <span className={task.isCompleted ? "line-through text-gray-500" : ""}>
        {task.title}
      </span>
      <button 
        onClick={() => onDelete(task.id)}
        className="ml-auto bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded"
      >
        Delete
      </button>
      {children}
    </li>
  );
}