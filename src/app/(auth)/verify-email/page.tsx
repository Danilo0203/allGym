// app/auth/verify-email/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl gap-0">
      <CardHeader className="flex items-center justify-center text-center">
        <MailCheck className="h-10 w-10 text-primary mb-2" />
        <CardTitle>¡Verifica tu correo!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Hemos enviado un enlace de verificación a <span className="font-medium">{email}</span>. Por favor revisa tu
          bandeja de entrada.
        </p>
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/login">Ir al inicio de sesión</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
