import React, { Suspense } from "react";
import type { ResumeData, TemplateType } from "../types/resume";
import { HarvardMinimal } from "../templates/HarvardMinimal";

interface ResumeRendererProps {
  data: ResumeData;
  template: TemplateType;
}

const LoadingTemplate: React.FC = () => (
  <div className="template-loading">
    <p>Cargando plantilla...</p>
  </div>
);

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({
  data,
  template,
}) => {
  console.log(data, template);
  const renderTemplate = () => {
    switch (template) {
      case "harvard-minimal":
        return <HarvardMinimal data={data} />;
      default:
        return (
          <div className="template-error">
            <h3>Plantilla no encontrada</h3>
            <p>La plantilla "{template}" no está disponible.</p>
          </div>
        );
    }
  };

  return <Suspense fallback={<LoadingTemplate />}>{renderTemplate()}</Suspense>;
};
