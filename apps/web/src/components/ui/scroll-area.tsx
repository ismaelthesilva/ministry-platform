// filepath: /Users/ismaelsilva/Dev-Mini/ismaHOST/ministry-platform/apps/web/src/components/ui/scroll-area.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-auto", className)}
    {...props}
  >
    {children}
  </div>
))
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }