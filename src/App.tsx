import { useState } from 'react';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: 'p1' | 'p2' | 'p3';
};

function App() {
  const [tasks, setTasks]= useState<Task[]>([
    {
      id: 1,
      title: 'Task1',
      isCompleted: false,
      priority: 'p2',
    },
  ]);
  const [taskName, setTaskName] = useState('');
  const onAddTask = () => {
    setTasks([...tasks, {id: Date.now(), title:taskName, isCompleted:false, priority: 'p1'}]);
  };

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-8">Todo-List Website</h1>
        <input
          value={taskName}
          placeholder='Enter text...'
          onChange={(e) => setTaskName(e.target.value)}
          id="text-input"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 pb-0.5 px-2 rounded"
          onClick={onAddTask}
        >
          +
        </button>
        <h1 className="text-2lg font-bold mt-8">Your list: </h1>
        <ul>
          {tasks.map((tasks) => (
            <li key={tasks.id}>{tasks.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
