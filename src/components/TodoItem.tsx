interface TodoItemProps {
  text: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ text }) => {
  return <li>{text}</li>;
};

export default TodoItem;
