import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('TodoItem', () => {
  const mockOnDelete = jest.fn();
  const mockOnToggle = jest.fn();

  const sampleTask: Task = {
    id: 1,
    title: 'Sample task',
    isCompleted: false,
    priority: 'p1',
  };

  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnToggle.mockClear();
  });

  it('renders task title and checkbox correctly', () => {
    render(
      <ul>
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    expect(screen.getByText('Sample task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('renders completed task with correct styles', () => {
    const completedTask: Task = {
      ...sampleTask,
      isCompleted: true,
    };

    render(
      <ul>
        <TodoItem task={completedTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    const taskText = screen.getByText('Sample task');
    expect(taskText).toHaveClass('line-through', 'text-gray-500');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ul>
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
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
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
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
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
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
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle}>
          <span>Additional content</span>
        </TodoItem>
      </ul>
    );

    expect(screen.getByText('Additional content')).toBeInTheDocument();
  });

  it('applies correct CSS classes to elements', () => {
    render(
      <ul>
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveClass('flex', 'items-center', 'gap-2', 'py-2', 'border-b');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-5', 'w-5');
  });

  it('handles different priority values', () => {
    const highPriorityTask: Task = {
      ...sampleTask,
      priority: 'p1',
    };

    render(
      <ul>
        <TodoItem task={highPriorityTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    expect(screen.getByText('Sample task')).toBeInTheDocument();
  });

  it('handles task without priority', () => {
    const taskWithoutPriority: Task = {
      id: 2,
      title: 'Task without priority',
      isCompleted: false,
    };

    render(
      <ul>
        <TodoItem task={taskWithoutPriority} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    expect(screen.getByText('Task without priority')).toBeInTheDocument();
  });
});
