"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNuevoClienteForm } from "@/hooks/registro/nuevoClienteForm.hook";
import { FormNuevoCliente } from "./form/nuevo-cliente/form-nuevo-cliente";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Entrenamiento } from "./views/entrenamiento";

export function TabsNuevoCliente() {
  const [activeTab, setActiveTab] = useState("datos-cliente");
  const { reset, form, onSumbit } = useNuevoClienteForm(() => setActiveTab("entrenamiento"));
  const { isSubmitting } = form.formState;
  const tabsArray = [
    { value: "datos-cliente", label: "Datos del Cliente" },
    { value: "entrenamiento", label: "Entrenamiento" },
    { value: "nutricion", label: "Nutricion" },
    { value: "pagos", label: "Pagos" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
      <TabsList className="grid w-full grid-cols-4">
        {tabsArray.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="w-full">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="datos-cliente" className="h-full">
        <Card className="h-full flex flex-col justify-between">
          <CardContent className="space-y-2">
            <FormNuevoCliente form={form} onSumbit={onSumbit} />
          </CardContent>
          <CardFooter className="flex ms-auto gap-4">
            <Button variant="outline" onClick={() => reset()}>
              Cancelar
            </Button>
            <Button form="form-nuevo-cliente" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  <span className="ml-2">Registrando...</span>
                </div>
              ) : (
                "Registrar"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="entrenamiento">
        <Card>
          {/* <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, youll be logged out.</CardDescription>
          </CardHeader> */}
          <CardContent className="space-y-2">
            <Entrenamiento />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
