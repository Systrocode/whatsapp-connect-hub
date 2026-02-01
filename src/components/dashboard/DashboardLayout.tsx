import { ReactNode, useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
  shouldScroll?: boolean;
  noPadding?: boolean;
}

const DashboardLayout = ({ children, shouldScroll = true, noPadding = false }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);


  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main
          className={`flex-1 flex flex-col min-h-0 ${noPadding ? 'p-0' : 'p-4 sm:p-6'} ${shouldScroll ? 'overflow-auto' : 'overflow-hidden'
            }`}
        >
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-r border-sidebar-border bg-sidebar">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardLayout;

