import type { Task } from "./TodoTaskTypes";

export type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'SET_TASK'; payload: Task[] };

export function todoReducer(state: Task[], action: Action): Task[] {
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