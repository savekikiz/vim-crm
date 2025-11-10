'use client'

import { CheckIcon, LoaderCircleIcon } from 'lucide-react'
import { Slot } from 'radix-ui'
import * as React from 'react'
import { createContext, useContext } from 'react'

import { cn } from '@/lib/utils'

type StepItemContextValue = {
  isDisabled: boolean
  isLoading: boolean
  state: StepState
  step: number
}

// Types
type StepperContextValue = {
  activeStep: number
  orientation: 'horizontal' | 'vertical'
  setActiveStep: (step: number) => void
}

type StepState = 'active' | 'completed' | 'inactive' | 'loading'

// Contexts
const StepperContext = createContext<StepperContextValue | undefined>(undefined)
const StepItemContext = createContext<StepItemContextValue | undefined>(
  undefined
)

const useStepper = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('useStepper must be used within a Stepper')
  }
  return context
}

const useStepItem = () => {
  const context = useContext(StepItemContext)
  if (!context) {
    throw new Error('useStepItem must be used within a StepperItem')
  }
  return context
}

// StepperIndicator
type StepperIndicatorProps = {
  asChild?: boolean
} & React.HTMLAttributes<HTMLDivElement>

// StepperItem
type StepperItemProps = {
  completed?: boolean
  disabled?: boolean
  loading?: boolean
  step: number
} & React.HTMLAttributes<HTMLDivElement>

// Components
type StepperProps = {
  defaultValue?: number
  onValueChange?: (value: number) => void
  orientation?: 'horizontal' | 'vertical'
  value?: number
} & React.HTMLAttributes<HTMLDivElement>

// StepperTrigger
type StepperTriggerProps = {
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Stepper({
  className,
  defaultValue = 0,
  onValueChange,
  orientation = 'horizontal',
  value,
  ...props
}: StepperProps) {
  const [activeStep, setInternalStep] = React.useState(defaultValue)

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step)
      }
      onValueChange?.(step)
    },
    [value, onValueChange]
  )

  const currentStep = value ?? activeStep

  return (
    <StepperContext.Provider
      value={{
        activeStep: currentStep,
        orientation,
        setActiveStep,
      }}
    >
      <div
        className={cn(
          'group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col',
          className
        )}
        data-orientation={orientation}
        data-slot="stepper"
        {...props}
      />
    </StepperContext.Provider>
  )
}

// StepperDescription
function StepperDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      data-slot="stepper-description"
      {...props}
    />
  )
}

function StepperIndicator({
  asChild = false,
  children,
  className,
  ...props
}: StepperIndicatorProps) {
  const { isLoading, state, step } = useStepItem()

  return (
    <span
      className={cn(
        'relative flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground',
        className
      )}
      data-slot="stepper-indicator"
      data-state={state}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          <span className="group-data-loading/step:scale-0 group-data-loading/step:opacity-0 group-data-loading/step:transition-none transition-all group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0">
            {step}
          </span>
          <CheckIcon
            aria-hidden="true"
            className="absolute scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
            size={16}
          />
          {isLoading && (
            <span className="absolute transition-all">
              <LoaderCircleIcon
                aria-hidden="true"
                className="animate-spin"
                size={14}
              />
            </span>
          )}
        </>
      )}
    </span>
  )
}

function StepperItem({
  children,
  className,
  completed = false,
  disabled = false,
  loading = false,
  step,
  ...props
}: StepperItemProps) {
  const { activeStep } = useStepper()

  const state: StepState =
    completed || step < activeStep
      ? 'completed'
      : activeStep === step
        ? 'active'
        : 'inactive'

  const isLoading = loading && step === activeStep

  return (
    <StepItemContext.Provider
      value={{ isDisabled: disabled, isLoading, state, step }}
    >
      <div
        className={cn(
          'group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col',
          className
        )}
        data-slot="stepper-item"
        data-state={state}
        {...(isLoading ? { 'data-loading': true } : {})}
        {...props}
      >
        {children}
      </div>
    </StepItemContext.Provider>
  )
}

// StepperSeparator
function StepperSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'm-0.5 bg-muted group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=vertical]/stepper:w-0.5 group-data-[orientation=horizontal]/stepper:flex-1 group-data-[state=completed]/step:bg-primary',
        className
      )}
      data-slot="stepper-separator"
      {...props}
    />
  )
}

// StepperTitle
function StepperTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-sm font-medium', className)}
      data-slot="stepper-title"
      {...props}
    />
  )
}

function StepperTrigger({
  asChild = false,
  children,
  className,
  ...props
}: StepperTriggerProps) {
  const { setActiveStep } = useStepper()
  const { isDisabled, step } = useStepItem()

  if (asChild) {
    const Comp = asChild ? Slot.Root : 'span'
    return (
      <Comp className={className} data-slot="stepper-trigger">
        {children}
      </Comp>
    )
  }

  return (
    <button
      className={cn(
        'inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      data-slot="stepper-trigger"
      disabled={isDisabled}
      onClick={() => setActiveStep(step)}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
}
