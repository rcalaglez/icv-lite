import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-secondary">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 bg-background border-r lg:static lg:inset-auto lg:w-auto ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <h1 className="text-3xl font-bold text-primary">iCV</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto lg:ml-0"
          >
            {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
          </Button>
        </div>
        <nav className="flex flex-col p-4">
          <Link
            to="/"
            className={`px-4 py-2 text-lg font-semibold rounded-lg hover:bg-secondary ${
              isCollapsed ? "text-center" : ""
            }`}
          >
            {isCollapsed ? "📝" : "Gestión de perfiles"}
          </Link>
        </nav>
      </aside>
      <main className={`flex-grow overflow-auto transition-all duration-300 ${
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      }`}>{
        children
      }</main>
    </div>
  );
};

export default MainLayout;