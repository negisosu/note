import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

import { Spinner } from "@/components/myui/spinner"

const buttonVariants = cva(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-myui-ring focus-visible:ring-[3px] focus-visible:ring-myui-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-myui-destructive aria-invalid:ring-myui-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: "bg-myui-primary text-myui-primary-foreground hover:bg-myui-primary/90",
                destructive:
                    "bg-myui-destructive text-myui-destructive-foreground hover:bg-myui-destructive/90 focus-visible:ring-myui-destructive/20",
                outline:
                    "border border-myui-border bg-myui-background text-myui-foreground shadow-xs hover:bg-myui-accent hover:text-myui-accent-foreground",
                secondary:
                    "bg-myui-secondary text-myui-secondary-foreground hover:bg-myui-secondary/80",
                ghost:
                    "hover:bg-myui-accent hover:text-myui-accent-foreground",
                link: "text-myui-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
                "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-8",
                "icon-lg": "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

type ButtonProps =
    React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> &
    {
        asChild?: boolean,
        /** 文字より前に表示するLucide iconsを渡す */
        startIcon?: LucideIcon,
        /** 文字より後に表示するLucide iconsを渡す */
        endIcon?: LucideIcon,
        /** 読み込み中はスピナーを表示して操作を無効化する */
        loading?: boolean,
    }

function Button({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    startIcon,
    endIcon,
    loading = false,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot.Root : "button"
    const StartIcon = startIcon
    const EndIcon = endIcon

    return(
        <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
        aria-busy={loading}
        disabled={loading || disabled}
        >
            {loading ? (
                <Spinner />
            ) : StartIcon ? (
                <StartIcon />
            ) : null}
            {children}
            {!loading && EndIcon ? <EndIcon /> : null}
        </Comp>
    )
}

export { Button, buttonVariants }
