import { render, screen } from '@testing-library/react';
import TodoList from '../components/todo/TodoList';
import TodoItem from '../components/todo/TodoItem';
import type { Task } from '../features/todos/TodoTaskTypes';

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
  // For the TodoItem component, we can mock it to simplify the tests
  it('Mocks TodoItem component with sample task', () => {
    const mockTask: Task = {
      id: 1,
      title: 'Mock task',
      isCompleted: false,
      priority: 'p1',
    };

    const { container } = render(
      <ul>
        <TodoItem task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );
    expect(screen.getByText('Mock task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  // Below are the tests for the TodoList component
  it('renders empty state when no tasks are provided', () => {
    const { container } = render(<TodoList tasks={[]} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/add your first task above/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders all tasks when tasks are provided', () => {
    const { container } = render(<TodoList tasks={sampleTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();
    expect(screen.getByText('Third task')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders the correct number of tasks', () => {
    const { container } = render(<TodoList tasks={sampleTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(container).toMatchSnapshot();
  });

  it('passes correct props to TodoItem components', () => {
    const { container } = render(<TodoList tasks={sampleTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

    // Check that checkboxes are rendered with correct states
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    expect(checkboxes[0]).not.toBeChecked(); // First task
    expect(checkboxes[1]).toBeChecked(); // Second task (completed)
    expect(checkboxes[2]).not.toBeChecked(); // Third task
    expect(container).toMatchSnapshot();
  });
});
