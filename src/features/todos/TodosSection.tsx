import TodoInput from '../../components/todo/TodoInput';
import TodoList from '../../components/todo/TodoList';
import { useTodos } from './hooks/useTodos';

export default function TodosSection() {
  const { todos, onAddTask, onDeleteTask, onToggleTask } = useTodos();

  return (
    <div>
      <TodoInput onAddTask={onAddTask} />

      <h2 className="text-lg font-bold mt-8 mb-4">Your list: </h2>

      {todos.map((task) => (
        <TodoList
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onToggle={onToggleTask}
        />
      ))}
    </div>
  );
}
