import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/todo/TodoList';
import TodoItem from '../components/todo/TodoItem';
import type { Task } from '../features/todos/TodoTaskTypes';

// Mock the Button component
jest.mock('../components/ui/Button', () => {
  return function MockButton({
    children,
    onClick,
    className,
    ...props
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      <button onClick={onClick} className={className} {...props}>
        {children}
      </button>
    );
  };
});

describe('TodoList', () => {
  const mockOnDelete = jest.fn();
  const mockOnToggle = jest.fn();

  const sampleTasks: Task[] = [
    {
      id: 1,
      title: 'First task',
      isCompleted: false,
      priority: 'p1',
    },
    {
      id: 2,
      title: 'Second task',
      isCompleted: true,
      priority: 'p2',
    },
    {
      id: 3,
      title: 'Third task',
      isCompleted: false,
      priority: 'p3',
    },
  ];

  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnToggle.mockClear();
  });

  describe('TodoList Component', () => {
    it('renders empty state when no tasks are provided', () => {
      render(<TodoList tasks={[]} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

      expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
      expect(screen.getByText(/add your first task above/i)).toBeInTheDocument();
    });

    it('renders all tasks when tasks are provided', () => {
      render(<TodoList tasks={sampleTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

      expect(screen.getByText('First task')).toBeInTheDocument();
      expect(screen.getByText('Second task')).toBeInTheDocument();
      expect(screen.getByText('Third task')).toBeInTheDocument();
    });

    it('renders the correct number of tasks', () => {
      render(<TodoList tasks={sampleTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });

    it('passes correct props to TodoItem components', () => {
      render(<TodoList tasks={sampleTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

      // Check that checkboxes are rendered with correct states
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3);
      expect(checkboxes[0]).not.toBeChecked(); // First task
      expect(checkboxes[1]).toBeChecked(); // Second task (completed)
      expect(checkboxes[2]).not.toBeChecked(); // Third task
    });
  });

  describe('TodoItem Component', () => {
    const singleTask: Task = {
      id: 1,
      title: 'Test task',
      isCompleted: false,
      priority: 'p1',
    };

    it('renders task title and checkbox correctly', () => {
      render(
        <ul>
          <TodoItem task={singleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
        </ul>
      );

      expect(screen.getByText('Test task')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).not.toBeChecked();
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });

    it('renders completed task with line-through style', () => {
      const completedTask: Task = {
        ...singleTask,
        isCompleted: true,
      };

      render(
        <ul>
          <TodoItem task={completedTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
        </ul>
      );

      const taskText = screen.getByText('Test task');
      expect(taskText).toHaveClass('line-through', 'text-gray-500');
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls onToggle when checkbox is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ul>
          <TodoItem task={singleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
        </ul>
      );

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(mockOnToggle).toHaveBeenCalledWith(1);
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onDelete when delete button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ul>
          <TodoItem task={singleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
        </ul>
      );

      const deleteButton = screen.getByRole('button', { name: 'Delete' });
      await user.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledWith(1);
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it('handles checkbox change via fireEvent', () => {
      render(
        <ul>
          <TodoItem task={singleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
        </ul>
      );

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(mockOnToggle).toHaveBeenCalledWith(1);
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('renders children when provided', () => {
      render(
        <ul>
          <TodoItem task={singleTask} onDelete={mockOnDelete} onToggle={mockOnToggle}>
            <span>Child content</span>
          </TodoItem>
        </ul>
      );

      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
      render(
        <ul>
          <TodoItem task={singleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
        </ul>
      );

      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveClass('flex', 'items-center', 'gap-2', 'py-2', 'border-b');

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-5', 'w-5');

      const deleteButton = screen.getByRole('button', { name: 'Delete' });
      expect(deleteButton).toHaveClass(
        'ml-auto',
        'bg-red-500',
        'hover:bg-red-700',
        'text-white',
        'text-sm',
        'py-1',
        'px-2',
        'rounded'
      );
    });
  });
});
