import React, { useState, useCallback } from "react";
import { ResumeForm } from "./ResumeForm";
import { ResumeRenderer } from "./ResumeRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Edit, Save, RotateCcw } from "lucide-react";
import type { ResumeData, TemplateType } from "../types/resume";
import { useResumeStore } from "../hooks/useResumeStore";
import "./ResumeEditor.css";

interface ResumeEditorProps {
  profileId: string;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ profileId }) => {
  const { getProfileById, updateProfile } = useResumeStore();
  const profile = getProfileById(profileId);

  const [currentData, setCurrentData] = useState<ResumeData>(
    profile?.data || ({} as ResumeData)
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleDataUpdate = useCallback((newData: ResumeData) => {
    setCurrentData(newData);
    setHasUnsavedChanges(true);
  }, []);

  const handleSave = useCallback(() => {
    if (profile) {
      updateProfile(profileId, { data: currentData });
      setHasUnsavedChanges(false);
    }
  }, [profileId, currentData, profile, updateProfile]);

  const handleReset = useCallback(() => {
    if (profile) {
      setCurrentData(profile.data);
      setHasUnsavedChanges(false);
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="resume-editor-error">
        <h3>Perfil no encontrado</h3>
        <p>El perfil solicitado no existe o ha sido eliminado.</p>
      </div>
    );
  }

  return (
    <div className="resume-editor">
      {/* Header con controles */}
      <div className="resume-editor-header">
        <div className="header-info">
          <h2 className="profile-title">{profile.name}</h2>
          <span className="template-badge">
            Plantilla: {profile.template.name}
          </span>
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

      {/* Contenido principal */}
      <div className="resume-editor-content">
        {isPreviewMode ? (
          // Vista solo preview en móvil
          <div className="preview-only">
            <Card className="preview-card">
              <ResumeRenderer
                data={currentData}
                template={profile.template.id as TemplateType}
              />
            </Card>
          </div>
        ) : (
          // Vista dividida en desktop, solo formulario en móvil
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
                  <ResumeRenderer
                    data={currentData}
                    template={profile.template.id as TemplateType}
                  />
                </div>
              </Card>
            </div>
          </>
        )}
      </div>

      {/* Indicador de cambios sin guardar en móvil */}
      {hasUnsavedChanges && (
        <div className="mobile-save-indicator">
          <div className="save-indicator-content">
            <span>Tienes cambios sin guardar</span>
            <div className="save-indicator-actions">
              <Button variant="outline" size="sm" onClick={handleReset}>
                Descartar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
