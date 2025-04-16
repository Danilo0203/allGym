import React from "react";
import { FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { ControllerRenderProps } from "react-hook-form";

export const InputProps = ({
  field,
  label,
  children,
  type = "text",
}: {
  field: ControllerRenderProps;
  label: string;
  children?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      // Convertir a número; si no se puede, se puede asignar 0 o dejar vacío según la lógica
      field.onChange(e.target.value ? Number(e.target.value) : "");
    } else {
      field.onChange(e.target.value);
    }
  };

  return (
    <FormItem className="bg-accent p-3 rounded-xl">
      <FormLabel>{label}</FormLabel>
      <div className="flex gap-2 items-center">
        <FormControl>
          <Input
            {...field}
            pattern={type === "number" ? "\\d*" : undefined}
            inputMode={type === "number" ? "numeric" : undefined}
            type={type}
            // Usamos nuestro manejador personalizado para el onChange
            onChange={handleChange}
            // Para inputs de tipo número, forzamos siempre que el value sea de tipo string o
            // bien se define la conversión adecuada:
            value={field.value || ""}
          />
        </FormControl>
        {children}
      </div>
      <FormMessage className="text-[.6em] ml-auto" />
    </FormItem>
  );
};
