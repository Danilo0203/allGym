"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { formatSegment } from "@/helpers/segmento-formato";

export default function TitlePage() {
  const router = useRouter();
  const path = usePathname();
  // Filtra los segmentos vacíos
  const segments = path.split("/").filter(Boolean);
  // Formatea cada segmento
  const formattedSegments = segments.map(formatSegment);
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button onClick={() => router.back()} variant="link" size="icon">
        <ArrowLeft className="size-8 text-gray-300/80" />
      </Button>
      <h2 className="text-3xl font-bold">
        <span className="text-gray-300/80">{formattedSegments[0]} / </span>
        <span>{formattedSegments[1]}</span>
      </h2>
    </div>
  );
}
