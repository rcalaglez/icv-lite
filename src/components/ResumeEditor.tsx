import React from "react";
import { useParams, Link } from "react-router-dom";
import { ResumeForm } from "./ResumeForm";
import { ResumeRenderer } from "./ResumeRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Edit, Save, RotateCcw, ChevronLeft } from "lucide-react";
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
  const { updateProfileData } = useResumeStore();

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
  } = useEditorState({ profileId });

  const handleTemplateChange = (templateId: TemplateType) => {
    const newTemplate = availableTemplates.find((t) => t.id === templateId);
    if (newTemplate && profile) {
      // Esto debería actualizar el perfil completo, no solo la plantilla
      // por ahora lo dejamos así para no complicar el store
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
          <h2 className="profile-title">{profile.name}</h2>
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