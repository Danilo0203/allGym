"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { formatSegment } from "@/helpers/segmento-formato";

export default function DynamicBreadcrumb() {
  const pathname = usePathname(); // Ejemplo: "/registro/new-client" o "/panel/registro/new-client"
  // Separamos y filtramos los segmentos (evitando strings vacíos)
  const segments = pathname.split("/").filter((seg) => seg.length > 0);
  // Si el primer segmento es 'panel', lo omitimos para evitar duplicados
  const additionalSegments = segments[0]?.toLowerCase() === "panel" ? segments.slice(1) : segments;
  const displaySegments = segments.map(formatSegment);
  const displayAdditionalSegments = segments[0]?.toLowerCase() === "panel" ? displaySegments.slice(1) : displaySegments;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/panel">Panel</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {additionalSegments.map((segment, index) => {
          const href = "/panel/" + additionalSegments.slice(0, index + 1).join("/");
          const isLast = index === additionalSegments.length - 1;
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className={isLast ? "" : "hidden md:block"}>
                {isLast ? (
                  <BreadcrumbPage>{displayAdditionalSegments[index]}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayAdditionalSegments[index]}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
