import { Link, useNavigate } from "react-router-dom";
import useResumeStore from "@/hooks/useResumeStore";
import { Button } from "@/components/ui/button";
import { FileImporterService } from "@/lib/importers/fileImporterService";
import { Upload, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React, { useRef } from "react";
import { motion } from "framer-motion";

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
    event.target.value = "";
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="container mx-auto p-4 sm:p-8"
    >
      <header className="hidden lg:flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <h1 className="text-4xl font-bold">Mis Perfiles</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Upload className="h-6 w-6 mr-2" />
            Importar CV
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            className="hidden"
            accept=".json"
          />
          <Button
            onClick={handleCreateProfile}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Plus className="h-6 w-6 mr-2" />
            Crear Nuevo Perfil
          </Button>
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: 0.1 }}
      >
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: index * 0.05 }}
            className="w-full"
          >
            <Link
              to={`/profile/${profile.id}`}
              className="block hover:no-underline group"
            >
              <Card className="h-full flex flex-col transition-all duration-300 transform sm:hover:-translate-y-1 sm:hover:shadow-xl sm:hover:border-primary">
                <CardHeader className="w-full">
                  <CardTitle className="text-lg sm:text-xl font-semibold tracking-tight sm:group-hover:text-2xl transition-all duration-300 truncate">
                    {profile.name}
                  </CardTitle>
                  <CardDescription className="hidden sm:block">
                    {profile.data.basics.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="hidden sm:block flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {profile.data.basics.summary}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProfileList;
