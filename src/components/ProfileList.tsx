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
      className="container mx-auto p-8"
    >
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Mis Perfiles</h1>
        <div className="flex gap-4">
          <Button onClick={() => fileInputRef.current?.click()} size={{ base: "default", md: "lg" }}>
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
          <Button onClick={handleCreateProfile} size={{ base: "default", md: "lg" }} variant="outline">
            <Plus className="h-6 w-6 mr-2" />
            Crear Nuevo Perfil
          </Button>
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
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
          >
            <Link
              to={`/profile/${profile.id}`}
              className="block hover:no-underline group"
            >
              <Card className="h-full flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold tracking-tight group-hover:text-2xl transition-all duration-300">
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
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProfileList;
