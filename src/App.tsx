import { useEffect } from "react";
import { useResumeStore } from "./hooks/useResumeStore";
import { HarvardMinimal } from "./templates/HarvardMinimal";

import "./App.css";
import { sampleResumeData } from "./data/resumeExample";

export default function App() {
  const { profiles, getActiveProfile, createProfile, setActiveProfile } =
    useResumeStore();

  // Cargar datos de ejemplo al iniciar la aplicación si no hay perfiles
  useEffect(() => {
    if (profiles.length === 0) {
      const profileId = createProfile(
        "María García López - Desarrolladora Full Stack",
        "harvard-minimal",
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

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-content">
          <h1 className="app-title">icv</h1>
          <p className="app-subtitle">Gestor de Perfiles de CV</p>

          <div className="profile-info">
            <h2 className="profile-name">{activeProfile.name}</h2>
            <span className="profile-template">
              Plantilla: {activeProfile.template}
            </span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="resume-container">
          {activeProfile.template === "harvard-minimal" && (
            <HarvardMinimal data={activeProfile.data} />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Perfil creado:{" "}
          {new Date(activeProfile.createdAt).toLocaleDateString("es-ES")} |
          Última actualización:{" "}
          {new Date(activeProfile.updatedAt).toLocaleDateString("es-ES")}
        </p>
      </footer>
    </div>
  );
}
