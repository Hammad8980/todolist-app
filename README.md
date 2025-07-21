# 📋 Todo List App

A modern, feature-rich todo application built with React, TypeScript, and Vite. This application provides a clean interface for managing tasks with priority levels, completion tracking, and local storage persistence.

## ✨ Features

- ✅ **Add, Edit, and Delete Tasks** - Full CRUD operations for task management
- 🎯 **Priority Levels** - Organize tasks with three priority levels (p1, p2, p3)
- ✔️ **Task Completion Tracking** - Mark tasks as completed with visual feedback
- 💾 **Local Storage Persistence** - Tasks are automatically saved and restored
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Vite for lightning-fast development
- 🧪 **Comprehensive Testing** - Full test coverage with Jest and React Testing Library

## 🛠 Tech Stack

- **Frontend Framework:** React 18.2.0
- **Language:** TypeScript
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 3.4.17
- **Testing:** Jest 29.x + React Testing Library
- **Code Quality:** ESLint + Prettier
- **State Management:** React useReducer + Custom Hooks

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── MainLayout.tsx
│   ├── todo/
│   │   ├── TodoInput.tsx      # Task input form
│   │   ├── TodoItem.tsx       # Individual task item
│   │   ├── TodoList.tsx       # Task list container
│   │   └── index.ts           # Barrel exports
│   └── ui/
│       └── Button.tsx         # Reusable button component
├── features/
│   └── todos/
│       ├── TodoReducer.ts     # State management logic
│       ├── TodosSection.tsx   # Main todos feature component
│       ├── TodoTaskTypes.ts   # TypeScript type definitions
│       └── hooks/
│           └── useTodos.ts    # Custom hook for todo operations
├── utils/
│   └── Storage.ts             # Local storage utilities
├── __tests__/                 # Test files
│   ├── TodoInput.test.tsx
│   ├── TodoItem.test.tsx
│   ├── TodoList.test.tsx
│   └── UseTodos.test.tsx
├── App.tsx
└── main.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hammad8980/todolist-app.git
   cd todolist-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm run build`         | Build production-ready application       |
| `npm run preview`       | Preview production build locally         |
| `npm run lint`          | Run ESLint for code quality checks       |
| `npm run format`        | Format code with Prettier                |
| `npm run format:check`  | Check code formatting                    |
| `npm test`              | Run test suite                           |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Run tests with coverage report           |

## 🧪 Testing Strategy

- **Unit Testing** - Comprehensive testing of individual functions, reducers, and custom hooks in isolation
- **Component Testing** - Testing React components with simulated user interactions and event handling
- **Mocking Strategy** - Mocking external dependencies, UI components, and browser APIs (localStorage) for isolated testing
- **Async & State Testing** - Testing asynchronous operations, state changes, and lifecycle events using fake timers and act()
- **Integration Testing** - Testing component interactions, data flow, and end-to-end user workflows
- **Edge Case & Error Handling** - Testing boundary conditions, invalid inputs, and error scenarios for robust application behavior

### Test Coverage

- **TodoInput Component** - Form handling, input validation, submission events
- **TodoItem Component** - Task display, completion toggle, deletion actions
- **TodoList Component** - List rendering, empty states, task management
- **useTodos Hook** - State management, local storage integration, CRUD operations
- **TodoReducer** - State mutations and action handling

## 📊 TypeScript Interfaces

### Task Type Definition

```typescript
export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: 'p1' | 'p2' | 'p3';
};
```

### Priority Levels

- **p1** - High Priority
- **p2** - Medium Priority
- **p3** - Low Priority

## 🎨 UI Components

### TodoInput

- Text input for new tasks
- Form validation and submission
- Keyboard support (Enter key)

### TodoItem

- Checkbox for completion toggle
- Task title display with strikethrough for completed tasks
- Delete button with confirmation
- Priority indicator

### TodoList

- Container for all tasks
- Empty state handling
- Responsive grid layout

## 💾 Data Persistence

The application uses localStorage to persist tasks between sessions:

```typescript
// Storage utilities
export const saveToStorage = <T>(key: string, data: T): void => {
  /* ... */
};
export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  /* ... */
};
```

## 🔧 Development

### Code Quality Tools

- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Code formatting and style consistency
- **TypeScript** - Type safety and better developer experience

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hammad** - [GitHub Profile](https://github.com/Hammad8980)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- Testing Library team for excellent testing utilities
