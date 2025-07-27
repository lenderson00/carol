import * as React from "react"
import { type LucideIcon } from "lucide-react"

interface EmptyCardProps {
  title: string
  description?: string
  icon: LucideIcon
  action?: React.ReactNode
}

export function EmptyCard({
  title,
  description,
  icon: Icon,
  action,
}: EmptyCardProps) {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div
        className="flex flex-col items-center"
      >
        <div className="mb-4 rounded-full border border-dashed p-4">
          <Icon className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  )
} 