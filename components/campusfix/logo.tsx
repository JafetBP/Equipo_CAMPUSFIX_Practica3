import { Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({ className, invertido = false }: { className?: string; invertido?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-md",
          invertido ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground",
        )}
        aria-hidden="true"
      >
        <Wrench className="size-4" />
      </span>
      <span className="text-base font-bold tracking-tight">
        CAMPUS<span className={invertido ? "text-cian" : "text-cian-fuerte"}>FIX</span>
      </span>
    </span>
  )
}
