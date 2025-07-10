import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFieldArray, type Control } from "react-hook-form";
import type { ResumeData } from "@/types/resume";
import React, { useCallback } from "react";

interface EducationCoursesProps {
  educationIndex: number;
  control: Control<ResumeData>;
}

const EducationCourses: React.FC<EducationCoursesProps> = ({
  educationIndex,
  control,
}) => {
  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: `education.${educationIndex}.courses` as const,
  });

  const handleAddCourse = useCallback(() => {
    console.log("Adding course for education index:", educationIndex);
    appendCourse("");
  }, [appendCourse, educationIndex]);

  const handleRemoveCourse = useCallback(
    (index: number) => {
      removeCourse(index);
    },
    [removeCourse]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FormLabel>Cursos relevantes</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddCourse}
        >
          <Plus className="h-4 w-4 mr-1" />
          Añadir curso
        </Button>
      </div>
      {courseFields.map((field, courseIndex) => (
        <div key={field.id} className="flex gap-2">
          <FormField
            control={control}
            name={`education.${educationIndex}.courses.${courseIndex}` as const}
            render={({ field: inputField }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Nombre del curso"
                    {...inputField}
                    value={inputField.value || ""}
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
            onClick={() => handleRemoveCourse(courseIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default EducationCourses;
