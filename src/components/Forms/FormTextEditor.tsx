"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import RichTextEditor from "../TextEditor/RichTextEditor";

type TFormRichTextEditorProps = {
  name: string;
  label?: string;
  required?: boolean;
  description?: string;
  className?: string;
};

const FormRichTextEditor = ({
  name,
  label,
  required,
  description,
  className,
}: TFormRichTextEditorProps) => {
  const { control } = useFormContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          {label && (
            <Label htmlFor={name} className={cn(error && "text-destructive")}>
              {label}
              {required && <span className="text-destructive">{` `}*</span>}
            </Label>
          )}

          <div
            className={cn(
              className,
              "rounded-md border bg-background p-2",
              error && "border-destructive"
            )}
          >
            <RichTextEditor value={field.value} onChange={field.onChange} />
          </div>

          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
          {error?.message && (
            <p className="text-[0.8rem] text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FormRichTextEditor;
