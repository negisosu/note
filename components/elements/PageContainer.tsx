import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  props?: HTMLAttributes<HTMLDivElement>
}

export function PageContainer({ children, props }: PageContainerProps) {
  return (
    <div className={cn("px-2 py-12 sm:px-3 sm:py-16 md:px-4 md:py-24 lg:px-6 lg:py-32 w-full flex flex-col")} {...props}>
      {children}
    </div>
  );
}
