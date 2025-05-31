import MainLayout from './components/layout/MainLayout';
import TodosSection from './features/todos/TodosSection';
function App() {
  return (
    <MainLayout>
      <TodosSection />
    </MainLayout>
  );
}

export default App;
