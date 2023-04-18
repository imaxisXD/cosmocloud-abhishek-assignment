"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "../../utils/lib/utils"

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            "peer inline-flex h-[18px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-slate-400 data-[state=checked]:bg-sky-500 ",
            className
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5"
            )}
        />
    </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
