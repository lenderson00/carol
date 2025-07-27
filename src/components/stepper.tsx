import React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  name: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              {/* Step Indicator */}
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200",
                  {
                    // Completed step
                    "bg-primary border-primary text-primary-foreground": currentStep > step.id,
                    // Current step
                    "border-primary bg-primary/10 text-primary ring-4 ring-primary/20": currentStep === step.id,
                    // Upcoming step
                    "border-muted-foreground/30 bg-background text-muted-foreground": currentStep < step.id,
                  }
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              
              {/* Step Content */}
              <div className="mt-3 text-center">
                <div
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    {
                      "text-primary": currentStep >= step.id,
                      "text-muted-foreground": currentStep < step.id,
                    }
                  )}
                >
                  {step.name}
                </div>
                {step.description && (
                  <div className="mt-1 text-xs text-muted-foreground max-w-[120px]">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 mb-8">
                <div
                  className={cn(
                    "h-0.5 w-full transition-colors duration-200",
                    {
                      "bg-primary": currentStep > step.id,
                      "bg-muted-foreground/30": currentStep <= step.id,
                    }
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// Compact version for smaller screens
export function CompactStepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200",
                  {
                    "bg-primary text-primary-foreground": currentStep > step.id,
                    "border-2 border-primary bg-primary/10 text-primary": currentStep === step.id,
                    "bg-muted text-muted-foreground": currentStep < step.id,
                  }
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <div
                  className={cn(
                    "text-sm font-medium",
                    {
                      "text-primary": currentStep >= step.id,
                      "text-muted-foreground": currentStep < step.id,
                    }
                  )}
                >
                  {step.name}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={cn(
                    "h-0.5 w-full transition-colors duration-200",
                    {
                      "bg-primary": currentStep > step.id,
                      "bg-muted-foreground/30": currentStep <= step.id,
                    }
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Stepper
