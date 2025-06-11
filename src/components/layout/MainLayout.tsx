import Header from './Header';
type PropsWithChildren = {
  children: React.ReactNode;
};

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default MainLayout
