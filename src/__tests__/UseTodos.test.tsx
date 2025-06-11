import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../features/todos/hooks/useTodos';
import { todoReducer, type Action } from '../features/todos/TodoReducer';
import * as Storage from '../utils/Storage';
import type { Task } from '../features/todos/TodoTaskTypes';


// Mock Storage functions
const STORAGE_KEY = 'Todo-App-Tasks';

describe('useTodos', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Storage, 'loadFromStorage').mockImplementation(() => []);
    jest.spyOn(Storage, 'saveToStorage').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('TodoReducer', () => {
    const initialState: Task[] = [
      {
        id: 1,
        title: 'Initial Task',
        isCompleted: false,
        priority: 'p1',
      },
    ];
    it( 'should add a task', () => {
        const result = todoReducer(initialState, { type: 'ADD_TASK', payload: 'New Task' })
        expect(result.length).toBe(2);
    })
    it('should delete a task', () => {
        const result = todoReducer(initialState, { type: 'DELETE_TASK', payload: 1 })
        expect(result.length).toBe(0);
    })
    it('should toggle a task', () => {
        const result = todoReducer(initialState, { type: 'TOGGLE_TASK', payload: 1})
        expect(result[0].isCompleted).toBe(true);
    })
    it('should set tasks', () => {
        const newTasks:Task[] = [{
            id:2,
            title:'My new task',
            isCompleted:false,
            priority:'p2'
        }]
        const result = todoReducer(initialState, {type: 'SET_TASK', payload: newTasks})
        expect(result).toEqual(newTasks);

    })
    it('should return current state for unkown actions', () => {
        const result = todoReducer(initialState, { type: 'UNKNOWN'} as unknown as Action);
        expect(result).toBe(initialState);
    });
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.todos).toEqual([]);
    expect(result.current).toMatchSnapshot();
  });

  it('should load todos from storage after timeout', async () => {
    const mockTodos: Task[] = [{ id: 1, title: 'Test', isCompleted: false }];
    (Storage.loadFromStorage as jest.Mock).mockReturnValueOnce(mockTodos);

    const { result } = renderHook(() => useTodos());
    act(() => {
      jest.runAllTimers();
    });

    expect(Storage.loadFromStorage).toHaveBeenCalledWith(STORAGE_KEY, []);
    expect(result.current.todos).toEqual(mockTodos);
    expect(result.current.isLoading).toBe(false);
    expect(result.current).toMatchSnapshot();
  });

  it('should add a new task', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      result.current.onAddTask('New Task');
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].title).toBe('New Task');
    expect(result.current.todos[0].isCompleted).toBe(false);
     expect(result.current).toMatchSnapshot();
  });

  it('should not add an empty task', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      result.current.onAddTask('   ');
    });

    expect(result.current.todos.length).toBe(0);
    expect(result.current).toMatchSnapshot();
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      result.current.onAddTask('Task to delete');
    });

    const id = result.current.todos[0].id;
    act(() => {
      result.current.onDeleteTask(id);
    });

    expect(result.current.todos.length).toBe(0);
    expect(result.current).toMatchSnapshot();
  });

  it('should toggle a task', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      result.current.onAddTask('Toggle Task');
    });

    const id = result.current.todos[0].id;
    act(() => {
      result.current.onToggleTask(id);
    });

    expect(result.current.todos[0].isCompleted).toBe(true);

    act(() => {
      result.current.onToggleTask(id);
    });

    expect(result.current.todos[0].isCompleted).toBe(false);
    expect(result.current).toMatchSnapshot();
  });

  it('should save todos to storage when todos change', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      result.current.onAddTask('Persist Task');
    });

    expect(Storage.saveToStorage).toHaveBeenCalledWith(STORAGE_KEY, expect.any(Array));
    expect(result.current).toMatchSnapshot();
  });
  it('should catch error when saving to storage fails', () => {
    (Storage.saveToStorage as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Fake error');
    });

    const { result } = renderHook(() => useTodos());
    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      result.current.onAddTask('Trigger Error');
    });
    expect(result.current).toMatchSnapshot();
  });
});
