import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ResumeForm } from "./ResumeForm";
import { ResumeRenderer } from "./ResumeRenderer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Trash2,
  Eye,
  Edit,
  Save,
  RotateCcw,
  ChevronLeft,
  Pencil,
  Copy,
  Download,
  MoreHorizontal,
  X,
  Printer,
} from "lucide-react";
import type { TemplateType } from "../types/resume";
import { useEditorState } from "@/hooks/useEditorState";
import useResumeStore from "@/hooks/useResumeStore";
import { availableTemplates } from "@/templates/templates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export const ResumeEditor: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const deleteProfile = useResumeStore((state) => state.deleteProfile);
  const updateProfileTemplate = useResumeStore(
    (state) => state.updateProfileTemplate
  );
  const duplicateProfile = useResumeStore((state) => state.duplicateProfile);
  const navigate = useNavigate();

  if (!profileId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          ID de perfil no proporcionado
        </h3>
        <p className="text-muted-foreground mb-8">
          Por favor, selecciona un perfil para editar.
        </p>
        <Link to="/">
          <Button variant="link">Volver a la lista</Button>
        </Link>
      </div>
    );
  }

  const {
    profile,
    hasUnsavedChanges,
    currentData,
    handleSave,
    handleDataUpdate,
    handleReset,
    isPreviewMode,
    setIsPreviewMode,
    isEditingName,
    editedName,
    setIsEditingName,
    handleNameChange,
    handleNameSave,
    handleNameKeyDown,
  } = useEditorState({ profileId });

  const handleDelete = () => {
    if (profileId) {
      deleteProfile(profileId);
      navigate("/");
    }
  };

  const handleDuplicate = () => {
    if (profileId) {
      const newProfileId = duplicateProfile(profileId);
      navigate(`/profile/${newProfileId}`);
    }
  };

  const handleExportJson = () => {
    if (currentData && profile) {
      const filename = `${profile.name
        .replace(/\s+/g, "-")
        .toLowerCase()}-resume.json`;
      const jsonStr = JSON.stringify(currentData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTemplateChange = (templateId: TemplateType) => {
    const newTemplate = availableTemplates.find((t) => t.id === templateId);
    if (newTemplate && profile) {
      updateProfileTemplate(profile.id, newTemplate);
    }
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <h3 className="text-2xl font-semibold mb-4">Perfil no encontrado</h3>
        <p className="text-muted-foreground mb-8">
          El perfil solicitado no existe o ha sido eliminado.
        </p>
        <Link to="/">
          <Button variant="link">Volver a la lista</Button>
        </Link>
      </div>
    );
  }

  const selectedTemplate = profile.template;

  const renderHeader = () => (
    <header className="hidden lg:flex items-center justify-between gap-4 p-4 bg-background border-b print:hidden">
      <div className="flex items-center gap-4 flex-grow">
        <Button variant="outline" size="icon" asChild className="h-10 w-10">
          <Link to="/">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div
          className="group flex items-center gap-2 cursor-pointer min-w-[300px]"
          onClick={() => setIsEditingName(true)}
        >
          {isEditingName ? (
            <input
              type="text"
              value={editedName}
              onChange={handleNameChange}
              onBlur={handleNameSave}
              onKeyDown={handleNameKeyDown}
              autoFocus
              className="bg-transparent border-b border-primary focus:outline-none text-2xl font-bold w-full"
            />
          ) : (
            <>
              <h2 className="text-2xl font-bold truncate">{profile.name}</h2>
              <Pencil className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </div>
        <Select
          value={selectedTemplate.id}
          onValueChange={(value) => handleTemplateChange(value as TemplateType)}
        >
          <SelectTrigger className="h-10 text-md max-w-[320px]">
            <SelectValue placeholder="Seleccionar plantilla" />
          </SelectTrigger>
          <SelectContent>
            {availableTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {hasUnsavedChanges && (
          <Button variant="ghost" onClick={handleReset} className="h-10">
            <RotateCcw className="h-4 w-4 mr-2" />
            Descartar
          </Button>
        )}
        <Button
          onClick={handleSave}
          disabled={!hasUnsavedChanges}
          className="h-10 min-w-[120px]"
        >
          <Save className="h-4 w-4 mr-2" />
          {hasUnsavedChanges ? "Guardar" : "Guardado"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="print:hidden">
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportJson}>
              <Download className="h-4 w-4 mr-2" />
              Exportar JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir / Exportar PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás absolutamente seguro?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará
                    permanentemente tu perfil
                    <span className="font-bold"> {profile.name}</span> y todos
                    sus datos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );

  const renderMobileHeader = () => (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b print:hidden">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild className="h-10 w-10">
            <Link to="/">
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          {isEditingName ? (
            <input
              type="text"
              value={editedName}
              onChange={handleNameChange}
              onBlur={handleNameSave}
              onKeyDown={handleNameKeyDown}
              autoFocus
              className="bg-transparent border-b border-primary focus:outline-none text-lg font-bold"
            />
          ) : (
            <h2
              className="text-lg font-bold truncate cursor-pointer py-2"
              onClick={() => setIsEditingName(true)}
            >
              {profile.name}
            </h2>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-2 pb-2 gap-2">
        <Select
          value={selectedTemplate.id}
          onValueChange={(value) => handleTemplateChange(value as TemplateType)}
        >
          <SelectTrigger className="h-10 flex-grow text-md">
            <SelectValue placeholder="Seleccionar plantilla" />
          </SelectTrigger>
          <SelectContent>
            {availableTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="print:hidden">
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportJson}>
              <Download className="h-4 w-4 mr-2" />
              Exportar JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir / Exportar PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás absolutamente seguro?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará
                    permanentemente tu perfil
                    <span className="font-bold"> {profile.name}</span> y todos
                    sus datos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Tabs
        value={isPreviewMode ? "preview" : "editor"}
        onValueChange={(value) => setIsPreviewMode(value === "preview")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="editor" className="text-md">
            <Edit className="h-4 w-4 mr-2" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-md">
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );

  return (
    <div className="flex flex-col h-screen bg-secondary print:h-auto print:bg-white">
      {renderHeader()}
      {renderMobileHeader()}

      <main className="flex-grow overflow-auto pt-40 lg:pt-4 lg:grid lg:grid-cols-2 lg:gap-8 lg:p-8 print:pt-0 print:grid-cols-1 print:p-0 print:overflow-visible">
        <div className={`lg:p-0 ${isPreviewMode ? "hidden lg:block" : "block"} print:hidden`}>
          <Card className="h-full p-0 lg:p-6 print:shadow-none print:border-0">
            <ResumeForm data={currentData} onUpdate={handleDataUpdate} />
          </Card>
        </div>

        <div className={`p-4 lg:p-0 ${isPreviewMode ? "block" : "hidden lg:block"} print:block`}>
          <div className="relative h-full print:h-auto">
            <Card className="h-full overflow-auto p-2 sm:p-8 print:h-auto print:overflow-visible print:shadow-none print:border-0 print:p-0 print:static">
              <ResumeRenderer
                data={currentData}
                template={selectedTemplate.id as TemplateType}
              />
            </Card>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 lg:hidden print:hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="rounded-full h-14 w-14 shadow-lg bg-background"
            >
              <X className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              onClick={handleSave}
              className="rounded-full h-14 w-14 shadow-lg"
            >
              <Save className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

