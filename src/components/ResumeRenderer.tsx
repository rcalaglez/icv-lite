import React, { Suspense, useMemo, lazy } from "react";
import type { ResumeData, TemplateType } from "../types/resume";

interface ResumeRendererProps {
  data: ResumeData;
  template: TemplateType;
}

// Lazy loading de plantillas
const HarvardMinimal = lazy(() =>
  import("../templates/HarvardMinimal").then((module) => ({
    default: module.HarvardMinimal,
  }))
);

// Registry de plantillas con lazy loading
const templateRegistry = new Map<
  TemplateType,
  React.LazyExoticComponent<React.FC<{ data: ResumeData }>>
>([["harvard-minimal", HarvardMinimal]]);

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

  const renderedTemplate = useMemo(() => {
    const TemplateComponent = templateRegistry.get(template);

    if (!TemplateComponent) {
      return (
        <div className="template-error">
          <h3>Plantilla no encontrada</h3>
          <p>La plantilla "{template}" no está disponible.</p>
        </div>
      );
    }

    return <TemplateComponent data={data} />;
  }, [template, data]);

  return <Suspense fallback={<LoadingTemplate />}>{renderedTemplate}</Suspense>;
};
