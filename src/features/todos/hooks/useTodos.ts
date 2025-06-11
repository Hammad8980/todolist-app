import { useReducer, useEffect, useState } from 'react';
import { type Task } from '../TodoTaskTypes';
import { saveToStorage, loadFromStorage } from '../../../utils/Storage';
import { todoReducer  } from '../TodoReducer';

const STORAGE_KEY = 'Todo-App-Tasks';

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
