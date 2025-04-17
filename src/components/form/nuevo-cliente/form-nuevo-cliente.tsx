import { Calendario } from "@/components/calendario";
// import { FileImage } from "@/components/file-image";
import { InputProps } from "@/components/input-props";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNuevoClienteForm } from "@/hooks/registro/nuevoClienteForm.hook";
interface FormNuevoClienteProps {
  form: ReturnType<typeof useNuevoClienteForm>["form"];
  onSumbit: ReturnType<typeof useNuevoClienteForm>["onSumbit"];
}

export const FormNuevoCliente = ({ form, onSumbit }: FormNuevoClienteProps) => {
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className="flex sm:flex-row flex-col justify-between gap-10"
        onSubmit={form.handleSubmit(onSumbit)}
        id="form-nuevo-cliente"
      >
        {/* <FormField
          name="imagenPerfil"
          control={form.control}
          render={() => (
            <FormItem className="h-fit grow">
              <FormLabel className="mb-2">Imagen de Perfil</FormLabel>
              <FormControl>
                <FileImage />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FileImage /> */}
        <div className="grow-[2] grid  grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="nombre"
            control={form.control}
            render={({ field }) => <InputProps field={{ ...field }} label="Nombre" disabled={isSubmitting} />}
          />
          <FormField
            name="telefono"
            control={form.control}
            render={({ field }) => (
              <InputProps field={{ ...field }} label="Telefono" type="number" disabled={isSubmitting} />
            )}
          />

          <FormField
            control={form.control}
            name="fechaNacimiento"
            render={({ field }) => (
              <FormItem className="bg-accent p-3 rounded-md">
                <FormLabel>Fecha Nacimiento</FormLabel>
                <FormControl>
                  <Calendario value={field.value} onChange={field.onChange} disabled={isSubmitting} />
                </FormControl>
                <FormMessage className="text-[.6em] ml-auto" />
              </FormItem>
            )}
          />

          <FormField
            name="sexo"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-accent p-3 rounded-md">
                <FormLabel>Sexo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full" disabled={isSubmitting}>
                      <SelectValue placeholder="Seleccion un genero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m">Masculino</SelectItem>
                    <SelectItem value="f">Femenino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[.6em] ml-auto" />
              </FormItem>
            )}
          />
          <FormField
            name="estatura"
            control={form.control}
            render={({ field }) => (
              <InputProps field={{ ...field }} type="number" label="Estatura" disabled={isSubmitting}>
                <span className="font-bold">CM</span>
              </InputProps>
            )}
          />
          <FormField
            name="peso"
            control={form.control}
            render={({ field }) => (
              <InputProps field={{ ...field }} label="Peso" type="number" disabled={isSubmitting}>
                <span className="font-bold">LBS</span>
              </InputProps>
            )}
          />
          <FormField
            name="tipoCuerpo"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-accent p-3 rounded-md">
                <FormLabel>Tipo de Cuerpo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full" disabled={isSubmitting}>
                      <SelectValue placeholder="Selecciona un tipo de cuerpo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SelectItem value="ectomorfo">Ectomorfo</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Constitución delgada, extremidades largas y dificultad para ganar masa muscular.</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SelectItem value="mesomorfo">Mesomorfo</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Cuerpo atlético, facilidad para ganar músculo y perder grasa.</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SelectItem value="endomorfo">Endomorfo</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tendencia a acumular grasa, metabolismo más lento y dificultad para perder peso.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[.6em] ml-auto" />
              </FormItem>
            )}
          />
          <FormField
            name="inscripcion"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-accent p-3 rounded-md">
                <FormLabel>Inscripción</FormLabel>
                <FormControl>
                  <Calendario value={field.value ?? new Date()} onChange={field.onChange} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="plan"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-accent p-3 rounded-md">
                <FormLabel>Plan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full" disabled={isSubmitting}>
                      <SelectValue placeholder="Seleccion un tipo de plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dia">Dia</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensual">Mensual</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[.6em] ml-auto" />
              </FormItem>
            )}
          />
          <FormField
            name="valor"
            control={form.control}
            render={({ field }) => (
              <InputProps field={{ ...field }} label="Valor" type="number" disabled={isSubmitting}>
                <span className="font-bold">GTQ</span>
              </InputProps>
            )}
          />
          <FormField
            name="fechaInicio"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-accent p-3 rounded-md">
                <FormLabel>Fecha de Inicio</FormLabel>
                <FormControl>
                  <Calendario value={field.value ?? new Date()} onChange={field.onChange} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
