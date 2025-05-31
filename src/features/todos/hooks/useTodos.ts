import { useReducer, useEffect, useState } from 'react';
import { type Task } from '../TodoTaskTypes';
import { saveToStorage, loadFromStorage } from '../../../utils/Storage';

const STORAGE_KEY = 'Todo-App-Tasks';

type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'SET_TASK'; payload: Task[] };

function todoReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        { id: Date.now(), title: action.payload, isCompleted: false, priority: 'p1' },
      ];
    case 'DELETE_TASK':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
    case 'SET_TASK':
      return action.payload;
    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetch = setTimeout(() => {
      const storedTodos = loadFromStorage<Task[]>(STORAGE_KEY, []);
      dispatch({ type: 'SET_TASK', payload: storedTodos });
      console.log('Saving todos...');
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(fetch);
  },[]);

  useEffect(() => {
    if (!isLoading) {
      try {
        saveToStorage(STORAGE_KEY, todos);
        console.log('Todos: ', todos);
      } catch (error) {
        console.log(error);
      }
    }
  }, [todos, isLoading]);

  const onAddTask = (title: string) => {
    if (title.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: title });
    }
  };
  const onDeleteTask = (id: number) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const onToggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  return {
    todos,
    isLoading,
    onAddTask,
    onDeleteTask,
    onToggleTask,
  };
}
