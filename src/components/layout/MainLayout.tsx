import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
import { ImportCVModal } from "@/components/ui/ImportCVModal";
import { LayoutContext } from "./layoutContext";
import { AiSettingsDialog } from "@/components/ai/AiSettingsDialog";
import { useAiConfigStore, isAiConfigured } from "@/stores/aiConfigStore";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const createProfile = useResumeStore((state) => state.createProfile);
  const aiConfig = useAiConfigStore((s) => s.config);
  const aiConfigured = isAiConfigured(aiConfig);

  const handleCreateProfile = () => {
    const newProfileId = createProfile();
    navigate(`/profile/${newProfileId}`);
  };

  const openImportModal = () => {
    setImportModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when opening modal
  };

  return (
    <LayoutContext.Provider value={{ openImportModal }}>
      <div className="flex h-screen bg-secondary">
        {isImportModalOpen && (
          <ImportCVModal onClose={() => setImportModalOpen(false)} />
        )}

        <AiSettingsDialog
          open={isAiSettingsOpen}
          onOpenChange={setIsAiSettingsOpen}
        />

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
              <DropdownMenuItem onClick={openImportModal}>
                <Upload className="h-4 w-4 mr-2" />
                Importar CV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAiSettingsOpen(true)}>
                <span className="mr-2">🤖</span>
                Configuración IA
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateProfile}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Nuevo Perfil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              className={`px-4 py-2 text-lg font-semibold rounded-lg hover:bg-secondary ${
                location.pathname === "/" ? "bg-secondary" : ""
              } ${isCollapsed ? "text-center" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isCollapsed ? "📝" : "Gestión de perfiles"}
            </Link>
            <Link
              to="/evaluate"
              className={`px-4 py-2 text-lg font-semibold rounded-lg hover:bg-secondary ${
                location.pathname === "/evaluate" ? "bg-secondary" : ""
              } ${isCollapsed ? "text-center" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isCollapsed ? "✨" : "Evaluar CV"}
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsAiSettingsOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className={`relative px-4 py-2 text-lg font-semibold rounded-lg hover:bg-secondary text-left ${
                isCollapsed ? "text-center" : ""
              }`}
            >
              {isCollapsed ? "🤖" : "Configuración IA"}
              {!aiConfigured && (
                <span
                  className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"
                  aria-label="IA no configurada"
                />
              )}
            </button>
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
    </LayoutContext.Provider>
  );
};

export default MainLayout;
