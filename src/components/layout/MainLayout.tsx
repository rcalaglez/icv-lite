import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  Menu,
  MoreVertical,
  Upload,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useResumeStore from "@/hooks/useResumeStore";
import { FileImporterService } from "@/lib/importers/fileImporterService";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const createProfile = useResumeStore((state) => state.createProfile);
  const importProfile = useResumeStore((state) => state.importProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateProfile = () => {
    const newProfileId = createProfile();
    navigate(`/profile/${newProfileId}`);
  };

  const handleImportFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await FileImporterService.importFile(file);
      const newProfileId = importProfile(
        importedData,
        file.name.split(".")[0]
      );
      navigate(`/profile/${newProfileId}`);
    } catch (error) {
      console.error("Error al importar el archivo:", error);
      alert(`Error al importar el archivo: ${(error as Error).message}`);
    }
    event.target.value = "";
  };

  return (
    <div className="flex h-screen bg-secondary">
      {/* Mobile and Tablet Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-background border-b lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu />
        </Button>
        <h1 className="text-xl font-bold">Mis Perfiles</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Importar CV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCreateProfile}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Nuevo Perfil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportFile}
          className="hidden"
          accept=".json"
        />
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col transition-transform duration-300 bg-background border-r
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <h1 className="text-3xl font-bold text-primary">iCV</h1>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex"
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
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {isCollapsed ? "📝" : "Gestión de perfiles"}
          </Link>
        </nav>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-grow overflow-auto transition-all duration-300
          pt-16 lg:pt-0
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
