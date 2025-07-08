import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Award, BookOpen } from "lucide-react";
import type { ResumeData } from "../types/resume";

// Schema de validación actualizado con Zod
const resumeSchema = z.object({
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

interface ResumeFormProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onUpdate }) => {
  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control: form.control,
    name: "work",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  const {
    fields: profileFields,
    append: appendProfile,
    remove: removeProfile,
  } = useFieldArray({
    control: form.control,
    name: "basics.profiles",
  });

  // Actualizar datos en tiempo real
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (form.formState.isValid) {
        onUpdate(value as ResumeData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  const onSubmit = (values: ResumeData) => {
    onUpdate(values);
  };

  // Componente para manejar highlights de trabajo
  const WorkHighlights: React.FC<{ workIndex: number }> = ({ workIndex }) => {
    const {
      fields: highlightFields,
      append: appendHighlight,
      remove: removeHighlight,
    } = useFieldArray({
      control: form.control,
      name: `work.${workIndex}.highlights`,
    });

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <FormLabel>Logros destacados</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendHighlight("")}
          >
            <Plus className="h-4 w-4 mr-1" />
            Añadir logro
          </Button>
        </div>
        {highlightFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`work.${workIndex}.highlights.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      placeholder="Describe un logro específico..."
                      className="min-h-[60px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeHighlight(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  // Componente para manejar cursos de educación
  const EducationCourses: React.FC<{ educationIndex: number }> = ({
    educationIndex,
  }) => {
    const {
      fields: courseFields,
      append: appendCourse,
      remove: removeCourse,
    } = useFieldArray({
      control: form.control,
      name: `education.${educationIndex}.courses`,
    });

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <FormLabel>Cursos relevantes</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendCourse("")}
          >
            <Plus className="h-4 w-4 mr-1" />
            Añadir curso
          </Button>
        </div>
        {courseFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`education.${educationIndex}.courses.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Nombre del curso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeCourse(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="resume-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basics">Básicos</TabsTrigger>
              <TabsTrigger value="experience">Experiencia</TabsTrigger>
              <TabsTrigger value="education">Educación</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
              <TabsTrigger value="certificates">Certificados</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="basics.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="basics.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título profesional</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ej. Desarrollador Full Stack"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="basics.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tu@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="basics.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="+34 600 123 456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="basics.url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sitio web</FormLabel>
                        <FormControl>
                          <Input placeholder="https://tusitio.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="basics.summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resumen profesional</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe tu experiencia y objetivos profesionales..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ubicación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="basics.location.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ciudad</FormLabel>
                          <FormControl>
                            <Input placeholder="Madrid" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="basics.location.region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Región/Estado</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Comunidad de Madrid"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Redes Sociales
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendProfile({ network: "", username: "", url: "" })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-end">
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        <FormField
                          control={form.control}
                          name={`basics.profiles.${index}.network`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Red</FormLabel>
                              <FormControl>
                                <Input placeholder="LinkedIn" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`basics.profiles.${index}.username`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Usuario</FormLabel>
                              <FormControl>
                                <Input placeholder="tuusuario" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`basics.profiles.${index}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeProfile(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Experiencia Laboral
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendWork({
                          name: "",
                          position: "",
                          startDate: "",
                          endDate: "",
                          summary: "",
                          highlights: [],
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Trabajo
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {workFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Trabajo #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeWork(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`work.${index}.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Posición *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Desarrollador Senior"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`work.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Empresa *</FormLabel>
                              <FormControl>
                                <Input placeholder="TechCorp" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`work.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha inicio *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`work.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha fin</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`work.${index}.summary`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe tus responsabilidades..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Separator />

                      <WorkHighlights workIndex={index} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Educación
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendEducation({
                          institution: "",
                          area: "",
                          studyType: "",
                          startDate: "",
                          endDate: "",
                          courses: [],
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Educación
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {educationFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Educación #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`education.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institución *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Universidad..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.studyType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de estudio *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Grado, Máster..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`education.${index}.area`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Área de estudio *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ingeniería Informática..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`education.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha inicio</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha fin</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.score`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Calificación</FormLabel>
                              <FormControl>
                                <Input placeholder="8.5/10" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      <EducationCourses educationIndex={index} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Habilidades
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendSkill({ name: "", level: "", keywords: [] })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Habilidad
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skillFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-end">
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <FormField
                          control={form.control}
                          name={`skills.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Habilidad *</FormLabel>
                              <FormControl>
                                <Input placeholder="JavaScript" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`skills.${index}.level`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nivel</FormLabel>
                              <FormControl>
                                <Input placeholder="Avanzado" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Idiomas
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendLanguage({ language: "", fluency: "" })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Idioma
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {languageFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-end">
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <FormField
                          control={form.control}
                          name={`languages.${index}.language`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Idioma *</FormLabel>
                              <FormControl>
                                <Input placeholder="Español" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`languages.${index}.fluency`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nivel *</FormLabel>
                              <FormControl>
                                <Input placeholder="Nativo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeLanguage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certificaciones
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendCertificate({
                          name: "",
                          date: "",
                          issuer: "",
                          url: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Certificación
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {certificateFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">
                          Certificación #{index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCertificate(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`certificates.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre del certificado *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="AWS Solutions Architect"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`certificates.${index}.issuer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emisor *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Amazon Web Services"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`certificates.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha de obtención *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`certificates.${index}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL de verificación</FormLabel>
                              <FormControl>
                                <Input placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};
