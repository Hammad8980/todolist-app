import { useState } from 'react';
import { type Task } from '../TodoTaskTypes';

export function useTodos() {
  const [todos, setTodos] = useState<Task[]>([]);

  const onAddTask = (title: string) => {
    if (title.trim() !== '') {
      setTodos([...todos, { id: Date.now(), title, isCompleted: false, priority: 'p1' }]);
    }
  };

  const onDeleteTask = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onToggleTask = (id: number) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    );
  };

  return {
    todos,
    onAddTask,
    onDeleteTask,
    onToggleTask,
  };
}
