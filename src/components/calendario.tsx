"use client";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
export const Calendario = ({
  value,
  onChange,
  disabled,
}: {
  value?: Date;
  onChange: (date?: Date) => void;
  disabled: boolean;
}) => {
  const [inputValue, setInputValue] = useState(value ? format(value, "dd/MM/yyyy") : "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const parsed = parse(val, "dd/MM/yyyy", new Date());
    if (!isNaN(parsed.getTime())) {
      onChange(parsed);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={disabled}>
          {value ? format(value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Input placeholder="dd/mm/aaaa" value={inputValue} onChange={handleInputChange} className="mb-2" />
        <Calendar
          classNames={{
            caption: "flex justify-center relative items-center",
            caption_dropdowns: "flex gap-4 -ml-4",
            dropdown:
              "bg-popover text-popover-foreground border border-border rounded-md px-1 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:bg-popover dark:border-border",
            caption_label: "hidden",
            dropdown_month: "flex items-center gap-2",
            dropdown_year: "flex items-center gap-2",
          }}
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={es}
          captionLayout="dropdown"
          labels={{
            labelMonthDropdown: () => "Mes",
            labelYearDropdown: () => "Año",
          }}
          fromYear={1900}
          toYear={new Date().getFullYear()}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        />
      </PopoverContent>
    </Popover>
  );
};
