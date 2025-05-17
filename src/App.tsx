import MainLayout from './components/layout/MainLayout.tsx';
import TodosSection from './features/todos/TodosSection.tsx';
function App() {
  return (
    <MainLayout>
      <TodosSection />
    </MainLayout>
  );
}

export default App;
