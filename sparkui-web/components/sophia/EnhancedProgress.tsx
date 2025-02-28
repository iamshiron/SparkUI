'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { VariantProps, cva } from 'class-variance-authority'
import { ClockIcon, GaugeIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const progressVariants = cva('relative h-2 w-full overflow-hidden rounded-full', {
    variants: {
        variant: {
            primary: 'bg-primary/20',
            secondary: 'bg-secondary/20',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
})

const indicatorVariants = cva('h-full w-full flex-1 transition-all', {
    variants: {
        variant: {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
})

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, VariantProps<typeof progressVariants> {}

const EnhancedProgress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
    ({ className, value, variant, ...props }, ref) => (
        <>
            <div className='w-full flex justify-between px-2'>
                <div className='flex items-center space-x-2'>
                    <GaugeIcon size={20} />
                    <span>Progress</span>
                </div>
                <div className='flex items-center space-x-2'>
                    <span>Time</span>
                    <ClockIcon size={20} />
                </div>
            </div>
            <ProgressPrimitive.Root ref={ref} className={cn(progressVariants({ variant }), className)} {...props}>
                <ProgressPrimitive.Indicator
                    className={cn(indicatorVariants({ variant }))}
                    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
                />
            </ProgressPrimitive.Root>
        </>
    )
)
EnhancedProgress.displayName = ProgressPrimitive.Root.displayName

export { EnhancedProgress }
