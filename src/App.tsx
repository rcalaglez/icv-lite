import { useEffect } from "react";
import { useResumeStore } from "./hooks/useResumeStore";
import { ResumeEditor } from "./components/ResumeEditor";
import "./App.css";
import { getDefaultTemplate } from "./templates/templates";
import { sampleResumeData } from "./data/resumeExample";

function App() {
  const { profiles, getActiveProfile, createProfile, setActiveProfile } =
    useResumeStore();

  useEffect(() => {
    if (profiles.length === 0) {
      const defaultTemplate = getDefaultTemplate();
      const profileId = createProfile(
        "María García López - Desarrolladora Full Stack",
        defaultTemplate,
        sampleResumeData
      );
      setActiveProfile(profileId);
    }
  }, [profiles.length, createProfile, setActiveProfile]);

  const activeProfile = getActiveProfile();

  if (!activeProfile) {
    return (
      <div className="app-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Inicializando icv</h2>
          <p>Cargando datos de ejemplo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <ResumeEditor profileId={activeProfile.id} />
    </div>
  );
}

export default App;
