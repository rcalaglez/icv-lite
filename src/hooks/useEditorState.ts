import { useCallback, useState, useEffect } from "react";
import type { ResumeData } from "../types/resume";
import useResumeStore from "./useResumeStore";

interface UseEditorStateProps {
  profileId: string;
}

export const useEditorState = ({ profileId }: UseEditorStateProps) => {
  const { getProfileById, updateProfileData, updateProfileName } = useResumeStore();
  const profile = getProfileById(profileId);

  const [currentData, setCurrentData] = useState<ResumeData>(
    profile?.data || ({} as ResumeData)
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Estado para la edición del nombre del perfil
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(profile?.name || "");

  useEffect(() => {
    // Actualizar el estado si el profileId cambia o los datos iniciales se cargan
    if (profile) {
      setCurrentData(profile.data);
      setHasUnsavedChanges(false);
      setEditedName(profile.name); // Sincronizar el nombre editado con el nombre del perfil
    }
  }, [profileId, profile]);

  const handleDataUpdate = useCallback((newData: ResumeData) => {
    setCurrentData(newData);
    setHasUnsavedChanges(true);
  }, []);

  const handleSave = useCallback(() => {
    if (profile) {
      updateProfileData(profileId, currentData);
      setHasUnsavedChanges(false);
    }
  }, [profileId, currentData, profile, updateProfileData]);

  const handleReset = useCallback(() => {
    if (profile) {
      setCurrentData(profile.data);
      setHasUnsavedChanges(false);
    }
  }, [profile]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  }, []);

  const handleNameSave = useCallback(() => {
    if (profile && editedName.trim() !== "" && editedName !== profile.name) {
      updateProfileName(profile.id, editedName.trim());
    }
    setIsEditingName(false);
  }, [profile, editedName, updateProfileName]);

  const handleNameKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameSave();
    } else if (e.key === "Escape") {
      setEditedName(profile?.name || "");
      setIsEditingName(false);
    }
  }, [profile, handleNameSave]);

  return {
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
  };
};