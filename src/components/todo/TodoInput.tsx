import { useState, type FormEvent } from 'react';
import Button from '../ui/Button';
type TodoInputProps = {
  onAddTask: (taskName: string) => void;
};

function TodoInput({ onAddTask }: TodoInputProps) {
  const [taskName, setTaskName] = useState('');
  const handleAddTasks = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Sometimes page is refreshed upon trigger of Event so this property is to prevent the browser from doing that
    onAddTask(taskName);
    setTaskName('');
  };
  return (
    <form className="flex" onSubmit={handleAddTasks}>
      {/*Below is the traditional onKeyDown method Commented for learning purposes*/}
      {/* <input
          value={taskName}
          placeholder='Enter text...'
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e)=> { if (e.key === "Enter") { handleAddTasks(); }}} // Enter key is send
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 pb-0.5 px-2 rounded"
          onClick={handleAddTasks}
        >
          +
        </button> */}
      <input
        type="text"
        value={taskName}
        placeholder="Enter text..."
        onChange={e => setTaskName(e.target.value)}
        className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-r rounded-l"
        type="submit"
      >
        +
      </Button>
    </form>
  );
}

export default TodoInput;
