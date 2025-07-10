import { useCallback, useState } from "react";
import { type ResumeData } from "../types/resume";
import { useResumeStore } from "./useResumeStore";

interface UseEditorStateProps {
  profileId: string;
}

export const useEditorState = ({ profileId }: UseEditorStateProps) => {
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
