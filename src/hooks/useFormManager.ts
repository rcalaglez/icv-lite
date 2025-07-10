import { useCallback, useMemo, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { ResumeData } from "../types/resume";

export const resumeSchema = z.object({
  basics: z.object({
    name: z.string().min(1, "El nombre es requerido"),
    label: z.string().optional(),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    phone: z.string().optional(),
    url: z.string().url("URL inválida").optional().or(z.literal("")),
    summary: z.string().optional(),
    location: z
      .object({
        city: z.string().optional(),
        region: z.string().optional(),
        address: z.string().optional(),
        postalCode: z.string().optional(),
        countryCode: z.string().optional(),
      })
      .optional(),
    profiles: z
      .array(
        z.object({
          network: z.string().min(1, "Red social requerida"),
          username: z.string().min(1, "Usuario requerido"),
          url: z.string().url("URL inválida"),
        })
      )
      .optional(),
  }),
  work: z
    .array(
      z.object({
        name: z.string().min(1, "Nombre de empresa requerido"),
        position: z.string().min(1, "Posición requerida"),
        url: z.string().optional(),
        startDate: z.string().min(1, "Fecha de inicio requerida"),
        endDate: z.string().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        institution: z.string().min(1, "Institución requerida"),
        area: z.string().min(1, "Área de estudio requerida"),
        studyType: z.string().min(1, "Tipo de estudio requerido"),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        score: z.string().optional(),
        url: z.string().optional(),
        courses: z.array(z.string()).optional(),
      })
    )
    .optional(),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Nombre de habilidad requerido"),
        level: z.string().optional(),
        keywords: z.array(z.string()).optional(),
      })
    )
    .optional(),
  languages: z
    .array(
      z.object({
        language: z.string().min(1, "Idioma requerido"),
        fluency: z.string().min(1, "Nivel requerido"),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        name: z.string().min(1, "Nombre del certificado requerido"),
        date: z.string().min(1, "Fecha requerida"),
        issuer: z.string().min(1, "Emisor requerido"),
        url: z.string().optional(),
      })
    )
    .optional(),
  interests: z
    .array(
      z.object({
        name: z.string().min(1, "Nombre del interés requerido"),
        keywords: z.array(z.string()).optional(),
      })
    )
    .optional(),
});

interface UseFormManagerProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export const useFormManager = ({ data, onUpdate }: UseFormManagerProps) => {
  const isUpdatingRef = useRef(false);
  const lastDataRef = useRef<string>("");

  const defaultValues = useMemo(() => {
    const normalized = {
      ...data,
      work:
        data.work?.map((w) => ({
          ...w,
          highlights: w.highlights || [],
        })) || [],
      education:
        data.education?.map((e) => ({
          ...e,
          courses: e.courses || [],
        })) || [],
      skills: data.skills || [],
      languages: data.languages || [],
      certificates: data.certificates || [],
      interests:
        data.interests?.map((i) => ({
          ...i,
          keywords: i.keywords || [],
        })) || [],
      basics: {
        ...data.basics,
        profiles: data.basics?.profiles || [],
        location: data.basics?.location || {},
      },
    };
    return normalized;
  }, [data]);

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const currentDataString = JSON.stringify(data);
    if (currentDataString !== lastDataRef.current && !isUpdatingRef.current) {
      lastDataRef.current = currentDataString;
      form.reset(defaultValues);
    }
  }, [data, form, defaultValues]);

  const handleUpdate = useCallback(
    (value: ResumeData) => {
      isUpdatingRef.current = true;
      onUpdate(value);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    },
    [onUpdate]
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const subscription = form.watch((value) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        if (form.formState.isValid && !isUpdatingRef.current) {
          const currentValueString = JSON.stringify(value);
          if (currentValueString !== lastDataRef.current) {
            lastDataRef.current = currentValueString;
            handleUpdate(value as ResumeData);
          }
        }
      }, 500);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [form, handleUpdate]);

  const onSubmit = useCallback(
    (values: ResumeData) => {
      handleUpdate(values);
    },
    [handleUpdate]
  );

  return { form, onSubmit };
};
