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
import { Separator } from "@/components/ui/separator";
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
      <div className="flex flex-col items-center justify-center h-screen">
        <h3 className="text-2xl font-semibold mb-4">ID de perfil no proporcionado</h3>
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
    setIsPreviewMode,
    isPreviewMode,
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

  const handleTemplateChange = (templateId: TemplateType) => {
    const newTemplate = availableTemplates.find((t) => t.id === templateId);
    if (newTemplate && profile) {
      updateProfileTemplate(profile.id, newTemplate);
    }
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
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

  return (
    <div className="flex flex-col h-screen bg-secondary">
      <header className="flex items-center justify-between p-4 bg-background border-b">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div
            className="group flex items-center gap-2 cursor-pointer"
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
                className="bg-transparent border-b border-primary focus:outline-none text-2xl font-bold"
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <Pencil className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </div>
          <Select
            value={selectedTemplate.id}
            onValueChange={(value) =>
              handleTemplateChange(value as TemplateType)
            }
          >
            <SelectTrigger className="w-[320px] h-14 text-lg font-bold border-4 border-solid">
              <SelectValue placeholder="Seleccionar plantilla" />
            </SelectTrigger>
            <SelectContent>
              {availableTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id} className="text-lg">
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-md bg-secondary p-1">
            <Button
              variant={!isPreviewMode ? "primary" : "ghost"}
              size="sm"
              onClick={() => setIsPreviewMode(false)}
            >
              <Edit className="h-5 w-5 mr-2" />
              Editar
            </Button>
            <Button
              variant={isPreviewMode ? "primary" : "ghost"}
              size="sm"
              onClick={() => setIsPreviewMode(true)}
            >
              <Eye className="h-5 w-5 mr-2" />
              Vista previa
            </Button>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-5 w-5 mr-2" />
                Descartar
              </Button>
            )}
            <Button
              variant={hasUnsavedChanges ? "default" : "outline"}
              size="sm"
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              <Save className="h-5 w-5 mr-2" />
              Guardar
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="h-5 w-5 mr-2" />
                  Duplicar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportJson}>
                  <Download className="h-5 w-5 mr-2" />
                  Exportar JSON
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-5 w-5 mr-2" />
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
                        <span className="font-bold"> {profile.name}</span> y
                        todos sus datos.
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
        </div>
      </header>

      <main className="flex-grow p-8 overflow-auto">
        {isPreviewMode ? (
          <div className="flex justify-center">
            <Card className="w-full max-w-4xl p-8">
              <ResumeRenderer
                data={currentData}
                template={selectedTemplate.id as TemplateType}
              />
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            <Card className="p-6">
              <ResumeForm data={currentData} onUpdate={handleDataUpdate} />
            </Card>
            <div className="relative">
              <Card className="p-8 sticky top-0">
                <ResumeRenderer
                  data={currentData}
                  template={selectedTemplate.id as TemplateType}
                />
                {hasUnsavedChanges && (
                  <div className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Cambios sin guardar
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
