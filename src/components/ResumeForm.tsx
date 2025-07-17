import React, { useCallback } from "react";
import { useFieldArray } from "react-hook-form";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  Award,
  BookOpen,
  Heart,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Globe,
  Languages,
} from "lucide-react";
import type { ResumeData } from "../types/resume";
import WorkHighlights from "./form/WorkHighlights";
import EducationCourses from "./form/EducationCourses";
import InterestKeywords from "./form/InterestKeywords";
import { useFormManager } from "../hooks/useFormManager";

interface ResumeFormProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onUpdate }) => {
  const { form, onSubmit } = useFormManager({ data, onUpdate });

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({ control: form.control, name: "work" });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control: form.control, name: "education" });
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control: form.control, name: "skills" });
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({ control: form.control, name: "languages" });
  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({ control: form.control, name: "certificates" });
  const {
    fields: interestFields,
    append: appendInterest,
    remove: removeInterest,
  } = useFieldArray({ control: form.control, name: "interests" });
  const {
    fields: profileFields,
    append: appendProfile,
    remove: removeProfile,
  } = useFieldArray({ control: form.control, name: "basics.profiles" });

  const formSections = [
    {
      id: "basics",
      title: "Básicos",
      icon: User,
      content: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5" />
                Ubicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <Input placeholder="Comunidad de Madrid" {...field} />
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
              <CardTitle className="flex items-center justify-between text-lg">
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
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
                    size="icon"
                    onClick={() => removeProfile(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "experience",
      title: "Experiencia",
      icon: Briefcase,
      content: (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experiencia Laboral
              </div>
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
                Añadir
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {workFields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Trabajo #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeWork(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <WorkHighlights workIndex={index} control={form.control} />
              </div>
            ))}
          </CardContent>
        </Card>
      ),
    },
    {
      id: "education",
      title: "Educación",
      icon: GraduationCap,
      content: (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
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
                Añadir
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {educationFields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Educación #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institución *</FormLabel>
                        <FormControl>
                          <Input placeholder="Universidad..." {...field} />
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
                          <Input placeholder="Grado, Máster..." {...field} />
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <EducationCourses
                  educationIndex={index}
                  control={form.control}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ),
    },
    {
      id: "skills",
      title: "Habilidades",
      icon: Wrench,
      content: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Habilidades
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    appendSkill({ name: "", level: "", keywords: [] })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-end">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
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
                    variant="destructive"
                    size="icon"
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
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Idiomas
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendLanguage({ language: "", fluency: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {languageFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-end">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
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
                    variant="destructive"
                    size="icon"
                    onClick={() => removeLanguage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "certificates",
      title: "Certificados",
      icon: Award,
      content: (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certificaciones
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendCertificate({ name: "", date: "", issuer: "", url: "" })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Añadir
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {certificateFields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Certificación #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeCertificate(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`certificates.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre *</FormLabel>
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
                          <Input placeholder="Amazon Web Services" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`certificates.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha *</FormLabel>
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
                        <FormLabel>URL</FormLabel>
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
      ),
    },
    {
      id: "interests",
      title: "Intereses",
      icon: Heart,
      content: (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Intereses
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendInterest({ name: "", keywords: [] })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Añadir
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {interestFields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Interés #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeInterest(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`interests.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Desarrollo de videojuegos..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator />
                <InterestKeywords
                  interestIndex={index}
                  control={form.control}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="resume-form h-full overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Mobile/Tablet Accordion View */}
          <div className="lg:hidden">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {formSections.map((section) => (
                <AccordionItem
                  value={section.id}
                  key={section.id}
                  className="border-b-0"
                >
                  <Card className="overflow-hidden">
                    <AccordionTrigger className="p-4 text-lg">
                      <div className="flex items-center gap-3">
                        <section.icon className="h-6 w-6" />
                        {section.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      {section.content}
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Desktop Tabs View */}
          <div className="hidden lg:block">
            <Tabs defaultValue="basics" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                {formSections.map((section) => (
                  <TabsTrigger value={section.id} key={section.id}>
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {formSections.map((section) => (
                <TabsContent
                  value={section.id}
                  key={section.id}
                  className="mt-4"
                >
                  {section.content}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </form>
      </Form>
    </div>
  );
};
