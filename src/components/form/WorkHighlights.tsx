import type { ResumeData } from "@/types/resume";
import type React from "react";
import { useCallback } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface WorkHighlightsProps {
  workIndex: number;
  control: Control<ResumeData>;
}

const WorkHighlights: React.FC<WorkHighlightsProps> = ({
  workIndex,
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `work.${workIndex}.highlights` as any,
  });

  const handleAddHighlight = useCallback(() => {
    append("");
  }, [append]);

  const handleRemoveHighlight = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FormLabel>Logros destacados</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddHighlight}
        >
          <Plus className="h-4 w-4 mr-1" />
          Añadir logro
        </Button>
      </div>
      {fields.map((field, highlightIndex) => (
        <div key={field.id} className="flex gap-2">
          <FormField
            control={control}
            name={`work.${workIndex}.highlights.${highlightIndex}` as const}
            render={({ field: inputField }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Describe un logro específico..."
                    className="min-h-[60px]"
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
            variant="destructive"
            size="icon"
            onClick={() => handleRemoveHighlight(highlightIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default WorkHighlights;
