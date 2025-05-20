import { useReducer, useEffect } from 'react';
import { type Task } from '../TodoTaskTypes';
import { saveToStorage, loadFromStorage } from '../../../utils/Storage';

const STORAGE_KEY = 'Todo-App-Tasks';

type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: number };

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
    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, loadFromStorage<Task[]>(STORAGE_KEY, []));
  useEffect(() => {
    console.log('Saving todos...');
    try {
      saveToStorage(STORAGE_KEY, todos);
      console.log('Todos: ', todos);
    } catch (error) {
      console.log(error);
    }

    return () => {
      console.log('Cleaning up: effect is being cleaned');
    };
  }, [todos]);

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
    onAddTask,
    onDeleteTask,
    onToggleTask,
  };
}
