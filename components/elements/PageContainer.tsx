import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("px-4 py-12 sm:px-6 sm:py-16 md:px-7 md:py-24 lg:px-8 lg:py-32 w-full", className)}>
      {children}
    </div>
  );
}
