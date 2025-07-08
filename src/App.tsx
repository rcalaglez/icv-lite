import { useEffect } from "react";
import { useResumeStore } from "./hooks/useResumeStore";
import { ResumeRenderer } from "./components/ResumeRenderer";
import "./App.css";
import { sampleResumeData } from "./data/resumeExample";
import { getDefaultTemplate, getTemplateById } from "./templates/templates";

function App() {
  const {
    profiles,
    getActiveProfile,
    createProfile,
    setActiveProfile,
    deleteProfile,
  } = useResumeStore();

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
      <div className="app-container">
        <div className="loading-state">
          <h2>Cargando perfil...</h2>
          <p>Inicializando icv con datos de ejemplo</p>
        </div>
      </div>
    );
  }

  const templateInfo = getTemplateById(activeProfile.template.id);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-content">
          <h1 className="app-title">icv</h1>
          <p className="app-subtitle">Gestor de Perfiles de CV</p>

          <div className="profile-info">
            <h2 className="profile-name">{activeProfile.name}</h2>
            <div className="profile-meta">
              <span className="profile-template">
                Plantilla: {templateInfo?.name || activeProfile.template.name}
              </span>
              <span className="profile-stats">
                {profiles.length} perfil{profiles.length !== 1 ? "es" : ""}{" "}
                guardado{profiles.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="resume-container">
          <ResumeRenderer
            data={activeProfile.data}
            template={activeProfile.template.id}
          />
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-dates">
            Creado:{" "}
            {new Date(activeProfile.createdAt).toLocaleDateString("es-ES")} |
            Actualizado:{" "}
            {new Date(activeProfile.updatedAt).toLocaleDateString("es-ES")}
          </p>
          {templateInfo && (
            <p className="footer-template-info">{templateInfo.description}</p>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
