import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { FileImporterService } from "@/lib/importers/fileImporterService";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { type ResumeData } from "@/types/resume";
import { UploadCloud } from "lucide-react";
import useResumeStore from "@/hooks/useResumeStore";
import { toast } from "sonner";
import { ZodError } from "zod";

interface ImportCVModalProps {
  onClose: () => void;
}

export function ImportCVModal({ onClose }: ImportCVModalProps) {
  const [activeTab, setActiveTab] = useState("json");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const importProfile = useResumeStore((state) => state.importProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    if (!modalRoot) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalRoot]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImport = useCallback(async () => {
    if (!selectedFile) {
      toast.error(
        "Error de importación: Por favor, selecciona un archivo para importar."
      );
      return;
    }

    setIsLoading(true);

    let errorMessage = "";
    try {
      const resumeData: ResumeData = await FileImporterService.importFile(
        selectedFile
      );
      importProfile(
        resumeData,
        selectedFile.name.split(".").slice(0, -1).join(".")
      );
      toast.success("¡CV importado exitosamente!");
      onClose();
    } catch (err) {
      errorMessage =
        "Error de importación: Ocurrió un error desconocido al importar el CV.";
      if (err instanceof ZodError) {
        errorMessage =
          "Error de importación: El archivo no tiene el formato de CV esperado. Por favor, verifica el contenido.";
        console.error("Zod validation error:", err.errors);
      } else if (err instanceof Error) {
        errorMessage = `Error de importación: ${err.message}`;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, importProfile, onClose]);

  const getAcceptedFileTypes = () => {
    switch (activeTab) {
      case "pdf":
        return "application/pdf";
      case "image":
        return "image/jpeg,image/png,image/webp,image/gif,image/bmp";
      case "json":
      default:
        return "application/json";
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  const modalContent = (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[100]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-4">Importar CV</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="image">Imagen</TabsTrigger>
          </TabsList>
          <TabsContent value="json">
            <p className="text-sm text-gray-500 mt-2">
              Importar un CV desde un archivo JSON.
            </p>
          </TabsContent>
          <TabsContent value="pdf">
            <p className="text-sm text-gray-500 mt-2">
              Extraer información de un PDF usando IA.
            </p>
          </TabsContent>
          <TabsContent value="image">
            <p className="text-sm text-gray-500 mt-2">
              Extraer información de una imagen usando IA.
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-4">
          <input
            type="file"
            accept={getAcceptedFileTypes()}
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div
            onClick={triggerFileSelect}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            {selectedFile ? (
              <p className="text-sm font-semibold text-gray-700">
                {selectedFile.name}
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Arrastra un archivo o{" "}
                <span className="font-semibold text-primary">
                  haz clic aquí
                </span>
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">{`Tipos soportados: ${getAcceptedFileTypes()}`}</p>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleImport} disabled={!selectedFile || isLoading}>
            {isLoading ? "Importando..." : "Importar"}
          </Button>
        </div>
      </div>
    </div>
  );

  if (!modalRoot) return null;

  return ReactDOM.createPortal(modalContent, modalRoot);
}
