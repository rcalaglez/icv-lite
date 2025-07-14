import { Link, useNavigate } from "react-router-dom";
import useResumeStore from "@/hooks/useResumeStore";
import { Button } from "@/components/ui/button";
import { FileImporterService } from "@/lib/importers/fileImporterService";
import { Upload } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React, { useRef } from "react";

const ProfileList = () => {
  const profiles = useResumeStore((state) => state.profiles);
  const createProfile = useResumeStore((state) => state.createProfile);
  const importProfile = useResumeStore((state) => state.importProfile);
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    const newProfileId = createProfile();
    navigate(`/profile/${newProfileId}`);
  };

  const handleImportFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await FileImporterService.importFile(file);
      const newProfileId = importProfile(importedData, file.name.split(".")[0]);
      navigate(`/profile/${newProfileId}`);
    } catch (error) {
      console.error("Error al importar el archivo:", error);
      alert(`Error al importar el archivo: ${(error as Error).message}`);
    }
    // Limpiar el input para permitir la misma selección de archivo de nuevo
    event.target.value = "";
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 bg-slate-900 text-white -mx-4 md:-mx-8 -mt-4 md:-mt-8 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="text-blue-500">i</span>CV
          </h1>
          <Button onClick={handleCreateProfile} size="lg">
            Crear Nuevo Perfil
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            className="hidden"
            accept=".json" // Solo JSON por ahora
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="lg"
            variant="outline"
          >
            <Upload className="h-5 w-5 mr-2" />
            Importar CV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <Link
            to={`/profile/${profile.id}`}
            key={profile.id}
            className="block hover:no-underline group"
          >
            <Card className="h-full flex flex-col border-2 border-slate-200/80 dark:border-slate-800 group-hover:border-blue-700 dark:group-hover:border-blue-600 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold tracking-tight">
                  {profile.name}
                </CardTitle>
                <CardDescription>{profile.data.basics.label}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {profile.data.basics.summary}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
