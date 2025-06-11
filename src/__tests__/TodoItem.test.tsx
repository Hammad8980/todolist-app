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
    [key: string]: unknown; //Allows any additional props (disabled, aria-label, type, etc.)
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
    const { container } = render(
      <ul>
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    expect(screen.getByText('Sample task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders completed task with correct styles', () => {
    const completedTask: Task = {
      ...sampleTask,
      isCompleted: true,
    };

    const { container } = render(
      <ul>
        <TodoItem task={completedTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    const taskText = screen.getByText('Sample task');
    expect(taskText).toHaveClass('line-through', 'text-gray-500');
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(container).toMatchSnapshot();
  });

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ul>
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ul>
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  it('handles checkbox change via fireEvent', () => {
    const { container } = render(
      <ul>
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  it('renders children when provided', () => {
    const { container } = render(
      <ul>
        <TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle}>
          <span>Additional content</span>
        </TodoItem>
      </ul>
    );

    expect(screen.getByText('Additional content')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('handles different priority values', () => {
    const highPriorityTask: Task = {
      ...sampleTask,
      priority: 'p1',
    };

    const { container } = render(
      <ul>
        <TodoItem task={highPriorityTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    expect(screen.getByText('Sample task')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('handles task without priority', () => {
    const taskWithoutPriority: Task = {
      id: 2,
      title: 'Task without priority',
      isCompleted: false,
    };

    const { container } = render(
      <ul>
        <TodoItem task={taskWithoutPriority} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );

    expect(screen.getByText('Task without priority')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('handles multiple tasks with different states', () => {
    const taskNotCompleted: Task = { id: 1, title: "Task 1", isCompleted: false, priority: 'p1' };
    const taskCompleted: Task = { id: 2, title: "Task 2", isCompleted: true, priority: 'p3' };
    const taskWithoutPriority: Task = { id: 3, title: "Task 3", isCompleted: false };

    const { rerender, container } = 
    render(<TodoItem task={taskNotCompleted} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(container).toMatchSnapshot('taskNotCompleted');

    rerender(<TodoItem task={taskCompleted} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(container).toMatchSnapshot('taskCompleted');

    rerender(<TodoItem task={taskWithoutPriority} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(container).toMatchSnapshot('taskWithoutPriority');
  });

  it('does not call callbacks on render', () => {
    const { container } = render(<TodoItem task={sampleTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

    expect(mockOnDelete).not.toHaveBeenCalled();
    expect(mockOnToggle).not.toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
