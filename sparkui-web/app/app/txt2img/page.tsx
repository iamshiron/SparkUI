'use client'

import { useState } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Textarea } from '@/components/ui/textarea'

import { ZapIcon, XIcon, TrashIcon, ChevronDownIcon, ReplaceIcon, PlusIcon, ShuffleIcon } from 'lucide-react'

import { EnhancedProgress } from '@/components/sophia/EnhancedProgress'
import { ImageDimensions } from '@/components/sophia/ImageDimensions'

interface GroupContainerProps {
    title: string
    children: React.ReactNode
}
const GroupContainer: React.FC<GroupContainerProps> = ({ title, children }: GroupContainerProps) => {
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

interface ConceptItemProps {
    thumbnail: string
    name: string
    weight: number
}
const ConceptItem: React.FC<ConceptItemProps> = ({ name, thumbnail, weight }) => {
    const [sliderValue, setSliderValue] = useState(weight)
    const [inputValue, setInputValue] = useState(weight)

    return (
        <div className='flex items-center justify-between p-1 border rounded-xl space-x-4'>
            <div className='flex w-full items-center space-x-2'>
                <img className='block w-10 h-10 rounded-full' src={thumbnail} alt='checkpoint icon' />
                <span className='text-nowrap'>{name}</span>
            </div>

            <div className='flex justify-end space-x-2 items-center w-full'>
                <Input
                    type='number'
                    className='flex-1 max-w-32 flex-grow'
                    min={0}
                    max={10}
                    step={0.1}
                    defaultValue={inputValue}
                    onChange={(e) => {
                        setInputValue(parseFloat(e.target.value))
                    }}
                />
                <Button variant='destructive' className='w-8 h-8 rounded-full'>
                    <TrashIcon />
                </Button>
            </div>
        </div>
    )
}

const SCHEDULERS = ['Euler A', 'DPM++ 2M', 'DPM++ 2M Karras', 'DPM++ 2M Exponential']

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
                    <GroupContainer title='Prompt'>
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
                    </GroupContainer>

                    <GroupContainer title='Resources'>
                        <div className='flex w-full space-x-2'>
                            <div className='flex flex-col flex-grow'>
                                <div className='grid grid-cols-[auto_1fr] items-center gap-2'>
                                    <span className='text-lg text-right'>Checkpoint:</span>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className='flex flex-row items-center space-x-2'>
                                            <img
                                                className='block w-12 h-12 rounded-full'
                                                src='https://picsum.photos/256/256'
                                                alt='checkpoint icon'
                                            />
                                            <div className='flex flex-col justify-start text-nowrap'>
                                                <span>StableDiffusion Checkpoint</span>
                                                <span>V1.5</span>
                                            </div>
                                        </div>

                                        <Button variant='outline'>
                                            <ReplaceIcon />
                                            Swap
                                        </Button>
                                    </div>

                                    <span className='text-lg text-right'>VAE:</span>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex flex-row items-center space-x-2'>
                                            <img
                                                className='block w-12 h-12 rounded-full'
                                                src='https://picsum.photos/256/256'
                                                alt='checkpoint icon'
                                            />
                                            <div className='flex flex-col justify-start text-nowrap'>
                                                <span>StableDiffusion VAE</span>
                                                <span>V1.5</span>
                                            </div>
                                        </div>

                                        <Button variant='outline'>
                                            <ReplaceIcon />
                                            Swap
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col space-y-4'>
                            <GroupContainer title='Lora (2)'>
                                <div className='rounded-xl w-full space-y-1'>
                                    <ConceptItem name='LoRA 1' thumbnail='https://picsum.photos/256/256' weight={2.5} />
                                    <ConceptItem name='LoRA 2' thumbnail='https://picsum.photos/256/256' weight={2.5} />
                                </div>
                            </GroupContainer>

                            <GroupContainer title='Embedding (2)'>
                                <div className='rounded-xl w-full space-y-1'>
                                    <ConceptItem name='Embedding 1' thumbnail='https://picsum.photos/256/256' weight={2.5} />
                                    <ConceptItem name='Embedding 2' thumbnail='https://picsum.photos/256/256' weight={2.5} />
                                </div>
                            </GroupContainer>

                            <GroupContainer title='ControlNet'>
                                <div className='text-center text-muted-foreground'>Coming Soon (TM)</div>
                            </GroupContainer>
                        </div>
                    </GroupContainer>
                    <GroupContainer title='Base Settings'>
                        <ImageDimensions />

                        <div className='flex space-x-2 items-center'>
                            <div className='flex flex-col w-full space-y-1'>
                                <Label htmlFor='steps'>Steps</Label>
                                <Input id='steps' type='number' className='text-center' min={1} max={100} defaultValue={35} step={1} />
                            </div>
                            <div className='flex flex-col w-full space-y-1'>
                                <Label htmlFor='cfgScale'>CFG Scale</Label>
                                <Input id='cfgScale' type='number' className='text-center' min={1} max={20} defaultValue={7.5} step={0.1} />
                            </div>
                            <div className='flex flex-col w-full space-y-1'>
                                <Label>Scheduler</Label>
                                <Select>
                                    <SelectTrigger className='flex-grow'>
                                        <SelectValue placeholder='Scheduler' defaultValue={SCHEDULERS[0]} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SCHEDULERS.map((scheduler, i) => (
                                            <SelectItem key={i} value={scheduler}>
                                                {scheduler}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <hr className='my-2' />

                        <div className='grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center'>
                            <Label htmlFor='seed'>Seed</Label>
                            <Input id='seed' type='number' className='text-center' min={0} max={100} defaultValue={42} />
                            <Button>
                                <ShuffleIcon />
                                Shuffle Seed
                            </Button>
                            <div className='flex justify-around space-x-2 items-center w-full'>
                                <Switch id='lockSeed' />
                                <Label htmlFor='lockSeed'>Lock</Label>
                            </div>

                            <Label htmlFor='subSeed'>Sub Seed</Label>
                            <Input id='subSeed' type='number' className='text-center' min={0} max={100} defaultValue={42} />
                            <Button>
                                <ShuffleIcon /> Shuffle Seed
                            </Button>
                            <div className='flex justify-around space-x-2 items-center w-full'>
                                <Switch id='lockSubSeed' />
                                <Label htmlFor='lockSubSeed'>Lock</Label>
                            </div>
                        </div>
                    </GroupContainer>
                </div>
            </div>

            <div className='flex flex-grow'>Main</div>

            <div className='flex w-1/4'>Viewer</div>
        </div>
    )
}
