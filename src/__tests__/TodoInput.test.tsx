import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from '../components/todo/TodoInput';

describe('TodoInput', () => {
  const mockAddTask = jest.fn();

  beforeEach(() => {
    mockAddTask.mockClear();
  });

  it('renders input field and button correctly', () => {
    render(<TodoInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText(/enter text/i);
    const button = screen.getByRole('button', { name: '+' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('updates input value when typing', async () => {
    const user = userEvent.setup();
    render(<TodoInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText(/enter text/i) as HTMLInputElement;

    await user.type(input, 'New task');

    expect(input.value).toBe('New task');
  });

  it('calls onAddTask with correct value when form is submitted via button click', async () => {
    const user = userEvent.setup();
    render(<TodoInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText(/enter text/i);
    const button = screen.getByRole('button', { name: '+' });

    await user.type(input, 'Test Task');
    await user.click(button);

    expect(mockAddTask).toHaveBeenCalledWith('Test Task');
    expect(mockAddTask).toHaveBeenCalledTimes(1);
  });

  it('calls onAddTask when form is submitted via Enter key', async () => {
    const user = userEvent.setup();
    render(<TodoInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText(/enter text/i);

    await user.type(input, 'Test Task{enter}');

    expect(mockAddTask).toHaveBeenCalledWith('Test Task');
    expect(mockAddTask).toHaveBeenCalledTimes(1);
  });

  it('clears input field after successful submission', async () => {
    const user = userEvent.setup();
    render(<TodoInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText(/enter text/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: '+' });

    await user.type(input, 'Test Task');
    await user.click(button);

    expect(input.value).toBe('');
  });

  it('does not call onAddTask when input is empty', async () => {
    const user = userEvent.setup();
    render(<TodoInput onAddTask={mockAddTask} />);

    const button = screen.getByRole('button', { name: '+' });

    await user.click(button);

    expect(mockAddTask).toHaveBeenCalledWith('');
    expect(mockAddTask).toHaveBeenCalledTimes(1);
  });

  it('handles form submission correctly', () => {
    render(<TodoInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText(/enter text/i);
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'Form submission test' } });
    fireEvent.submit(form!);

    expect(mockAddTask).toHaveBeenCalledWith('Form submission test');
    expect(mockAddTask).toHaveBeenCalledTimes(1);
  });
});
