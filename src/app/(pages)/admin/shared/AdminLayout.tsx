import Sidebar from './Sidebar';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="fixed top-0 left-0 h-screen w-64 z-20">
        <Sidebar />
      </div>
      <main className="ml-64 p-8 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}