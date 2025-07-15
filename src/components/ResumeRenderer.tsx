import React, { Suspense, useMemo, lazy } from "react";
import type { ResumeData, TemplateType } from "../types/resume";
import { motion, AnimatePresence } from "framer-motion";

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

const HarvardMostMinimal = lazy(() =>
  import("../templates/HarvardMostMinimal").then((module) => ({
    default: module.HarvardMostMinimal,
  }))
);

// Registry de plantillas con lazy loading
const templateRegistry = new Map<
  TemplateType,
  React.LazyExoticComponent<React.FC<{ data: ResumeData }>>
>([
  ["harvard-minimal", HarvardMinimal],
  ["harvard-most-minimal", HarvardMostMinimal],
]);

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

  const TemplateComponent = useMemo(
    () => templateRegistry.get(template),
    [template]
  );

  if (!TemplateComponent) {
    return (
      <div className="template-error">
        <h3>Plantilla no encontrada</h3>
        <p>La plantilla "{template}" no está disponible.</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={template} // Key is essential for AnimatePresence to detect changes
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.1 }}
      >
        <Suspense fallback={<LoadingTemplate />}>
          <TemplateComponent data={data} />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};
