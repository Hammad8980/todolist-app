import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Increment the button</h1>
        <p>Clicks: {count}</p>
        <button
          className="bg-white p-2 rounded-lg shadow-md accent-slate-300"
          onClick={increment}
        >
          Click me
        </button>
      </div>
    </div>
  );
}

export default App;
