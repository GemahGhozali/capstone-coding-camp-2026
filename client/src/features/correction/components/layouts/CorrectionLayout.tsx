import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

export function CorrectionLayout() {
  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(true);

  const handleCloseSidebar = () => setSidebarCollapse(true);
  const handleToggleSidebar = () => setSidebarCollapse((prevState) => !prevState);

  return (
    <main className="h-dvh flex flex-col">
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className="flex grow overflow-hidden relative">
        <Outlet />
        <Sidebar isClosed={sidebarCollapse} onCloseSidebar={handleCloseSidebar} />
      </div>
    </main>
  );
}
