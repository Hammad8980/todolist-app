import { useState } from 'react';
import type { Task } from './components/TodoTaskTypes';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const onAddTask = (taskName: string) => {
    if (taskName.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), title: taskName, isCompleted: false, priority: 'p1' },
      ]);
    }
    console.log('total tasks:', tasks);
  };

  const onDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    {
      console.log('Delete button clicked');
    }
  };

  const onToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
    {
      console.log('Toggled');
    }
  };
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8">Todo-List Website</h1>
        <TodoInput onAddTask={onAddTask} />
        <h1 className="text-lg font-bold mt-8 mb-4">Your list: </h1>
        {tasks.length === 0 ? (
          <p className="text-gray-500">
            No tasks yet. Add your first task above!
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onToggle={onToggleTask}
              >
                {/*just added priority(default:high) for children props rendering, I wanted to : )*/}
                {task.priority === 'p1' && (
                  <span className="ml-2 bg-red-200 text-red-800 text-xs px-2 py-1 rounded">
                    High
                  </span>
                )}
              </TodoItem>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;