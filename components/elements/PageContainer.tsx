import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("px-4 py-6 sm:px-6 md:px-7 lg:px-8 w-full", className)}>
      {children}
    </div>
  );
}
