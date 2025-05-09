import { useState } from 'react';
import type { Task } from './components/TodoItem';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks]= useState<Task[]>([]);
  const onAddTask = (taskName:string) => {
    setTasks([...tasks, {id: Date.now(), title:taskName, isCompleted:false, priority: 'p1'}]);
  };

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-8">Todo-List Website</h1>
        <TodoInput onAddTask={onAddTask}/>
        <h1 className="text-2lg font-bold mt-8">Your list: </h1>
        <TodoList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
