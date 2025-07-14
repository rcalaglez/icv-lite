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
import { Trash2, Eye, Edit, Save, RotateCcw, ChevronLeft, Pencil, Copy, Download } from "lucide-react";
import type { TemplateType } from "../types/resume";
import "./ResumeEditor.css";
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

export const ResumeEditor: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const deleteProfile = useResumeStore((state) => state.deleteProfile);
  const updateProfileTemplate = useResumeStore((state) => state.updateProfileTemplate);
  const duplicateProfile = useResumeStore((state) => state.duplicateProfile);
  const navigate = useNavigate();

  if (!profileId) {
    return (
      <div className="resume-editor-error">
        <h3>ID de perfil no proporcionado</h3>
        <p>Por favor, selecciona un perfil para editar.</p>
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
      navigate('/');
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
      const filename = `${profile.name.replace(/\s+/g, '-').toLowerCase()}-resume.json`;
      const jsonStr = JSON.stringify(currentData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
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
      <div className="resume-editor-error">
        <h3>Perfil no encontrado</h3>
        <p>El perfil solicitado no existe o ha sido eliminado.</p>
        <Link to="/">
          <Button variant="link">Volver a la lista</Button>
        </Link>
      </div>
    );
  }

  const selectedTemplate = profile.template;

  return (
    <div className="resume-editor">
      <div className="resume-editor-header">
        <div className="header-info">
          <Button variant="outline" size="icon" asChild>
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="profile-title group flex items-center gap-2 cursor-pointer" onClick={() => setIsEditingName(true)}>
            {isEditingName ? (
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                onBlur={handleNameSave}
                onKeyDown={handleNameKeyDown}
                autoFocus
                className="bg-transparent border-b border-blue-500 focus:outline-none focus:border-blue-700 text-xl font-semibold tracking-tight"
              />
            ) : (
              <>
                {profile.name}
                <Pencil className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </h2>
          <Select
            value={selectedTemplate.id}
            onValueChange={(value) =>
              handleTemplateChange(value as TemplateType)
            }
          >
            <SelectTrigger className="w-[280px]">
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

        <div className="header-controls">
          <div className="view-toggle">
            <Button
              variant={!isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(false)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Vista previa
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="action-buttons">
            {hasUnsavedChanges && (
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Descartar
              </Button>
            )}
            <Button
              variant={hasUnsavedChanges ? "default" : "outline"}
              size="sm"
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
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

            <Button variant="outline" size="sm" onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicar
            </Button>

            <Button variant="outline" size="sm" onClick={handleExportJson}>
              <Download className="h-4 w-4 mr-2" />
              Exportar JSON
            </Button>
          </div>
        </div>
      </div>

      <div className="resume-editor-content">
        {isPreviewMode ? (
          <div className="preview-only">
            <Card className="preview-card">
              <div className="preview-content">
                <div className="cv-wrapper">
                  <ResumeRenderer
                    data={currentData}
                    template={selectedTemplate.id as TemplateType}
                  />
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <div className="editor-panel">
              <Card className="form-card">
                <ResumeForm data={currentData} onUpdate={handleDataUpdate} />
              </Card>
            </div>

            <div className="preview-panel">
              <Card className="preview-card">
                <div className="preview-header">
                  <h3>Vista previa</h3>
                  {hasUnsavedChanges && (
                    <span className="unsaved-indicator">
                      Cambios sin guardar
                    </span>
                  )}
                </div>
                <div className="preview-content">
                  <div className="cv-wrapper">
                    <ResumeRenderer
                      data={currentData}
                      template={selectedTemplate.id as TemplateType}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
