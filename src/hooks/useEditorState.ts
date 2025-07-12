import { useCallback, useState, useEffect } from "react";
import type { ResumeData } from "../types/resume";
import useResumeStore from "./useResumeStore";

interface UseEditorStateProps {
  profileId: string;
}

export const useEditorState = ({ profileId }: UseEditorStateProps) => {
  const { getProfileById, updateProfileData } = useResumeStore();
  const profile = getProfileById(profileId);

  const [currentData, setCurrentData] = useState<ResumeData>(
    profile?.data || ({} as ResumeData)
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // Actualizar el estado si el profileId cambia o los datos iniciales se cargan
    if (profile) {
      setCurrentData(profile.data);
      setHasUnsavedChanges(false);
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

  return {
    profile,
    hasUnsavedChanges,
    currentData,
    handleSave,
    handleDataUpdate,
    handleReset,
    setIsPreviewMode,
    isPreviewMode,
  };
};