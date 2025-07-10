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

interface InterestKeywordsProps {
  interestIndex: number;
  control: Control<ResumeData>;
}

const InterestKeywords: React.FC<InterestKeywordsProps> = ({
  interestIndex,
  control,
}) => {
  const {
    fields: keywordFields,
    append: appendKeyword,
    remove: removeKeyword,
  } = useFieldArray({
    control,
    name: `interests.${interestIndex}.keywords` as const,
  });

  const handleAddKeyword = useCallback(() => {
    console.log("Adding keyword for interest index:", interestIndex);
    appendKeyword("");
  }, [appendKeyword, interestIndex]);

  const handleRemoveKeyword = useCallback(
    (index: number) => {
      removeKeyword(index);
    },
    [removeKeyword]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FormLabel>Palabras clave</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddKeyword}
        >
          <Plus className="h-4 w-4 mr-1" />
          Añadir palabra
        </Button>
      </div>
      {keywordFields.map((field, keywordIndex) => (
        <div key={field.id} className="flex gap-2">
          <FormField
            control={control}
            name={
              `interests.${interestIndex}.keywords.${keywordIndex}` as const
            }
            render={({ field: inputField }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="ej. JavaScript, React..."
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
            onClick={() => handleRemoveKeyword(keywordIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default InterestKeywords;
