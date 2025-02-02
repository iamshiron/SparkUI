'use client'

import { useState } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'

import { EnhancedProgress } from '@/components/sophia/EnhancedProgress'
import { Textarea } from '@/components/ui/textarea'

import { ZapIcon, XIcon, TrashIcon, ChevronDownIcon } from 'lucide-react'

interface ImageSettingsGroupProps {
    title: string
    children: React.ReactNode
}
const ImageSettingsGroup: React.FC<ImageSettingsGroupProps> = ({ title, children }: ImageSettingsGroupProps) => {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <div className='relative border rounded-lg pt-4 pb-2 px-2 mt-2'>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className='absolute -top-2 left-3 px-2 flex items-center gap-1 bg-background3'
            >
                <span className='text-sm font-medium'>{title}</span>
                <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'transform rotate-0' : 'transform -rotate-90'}`}
                />
            </button>

            <div
                className={`
                space-y-2
                transition-all duration-200 ease-in-out
                ${isExpanded ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}
            `}
            >
                {children}
            </div>
        </div>
    )
}

export default function PageTxt2Img() {
    return (
        <div className='flex w-full h-full bg-background2 p-2 rounded-tl-lg' style={{ height: 'calc(100vh - 78px)' }}>
            <div className='bg-background3 rounded-md flex flex-col w-1/4 overflow-y-scroll h-full px-2 pb-2'>
                <header className='flex sticky items-center gap-2 flex-col top-0 z-10 bg-inherit py-2'>
                    <div className='flex gap-1 w-full'>
                        <div className='flex flex-grow space-x-1'>
                            <Button className='flex-grow px-2'>Generate</Button>
                            <Button className='w-10' variant='secondary'>
                                <ZapIcon />
                            </Button>
                        </div>

                        <Input className='flex-shrink max-w-16' type='number' min={1} max={9} defaultValue={4} />
                        <Input className='flex-shrink max-w-16' type='number' min={1} max={9} defaultValue={4} />

                        <div className='flex space-x-1'>
                            <Button className='w-10' variant='destructive'>
                                <XIcon />
                            </Button>
                            <Button className='w-10' variant='destructive'>
                                <TrashIcon />
                            </Button>
                        </div>
                    </div>

                    <Progress />
                    <Progress variant='secondary' />
                </header>

                {/* Image Settings */}
                <div className='flex flex-col space-y-2'>
                    <ImageSettingsGroup title='Prompt'>
                        <div className='flex flex-col space-y-1'>
                            <div className='flex justify-between'>
                                <Label htmlFor='prompt'>Prompt</Label>
                                <Label htmlFor='prompt'>20/75</Label>
                            </div>
                            <Textarea id='prompt' className='p-1' />
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <div className='flex justify-between'>
                                <Label htmlFor='negative_prompt'>Negative Prompt</Label>
                                <Label htmlFor='negative_prompt'>15/75</Label>
                            </div>
                            <Textarea id='negative_prompt' className='p-1' />
                        </div>
                    </ImageSettingsGroup>
                </div>
            </div>

            <div className='flex flex-grow'>Main</div>

            <div className='flex w-1/4'>Viewer</div>
        </div>
    )
}
