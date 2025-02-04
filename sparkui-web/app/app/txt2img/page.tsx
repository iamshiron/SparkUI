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

import { ZapIcon, XIcon, TrashIcon, ChevronDownIcon, ReplaceIcon, PlusIcon, ShuffleIcon, CloudDownloadIcon } from 'lucide-react'

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

interface ImageBoardProps {
    thumbnail: string
    name: string
}
const ImageBoard: React.FC<ImageBoardProps> = ({ thumbnail, name }) => {
    return (
        <>
            <img className='h-12 aspect-square rounded-lg' src={thumbnail} />
            <span className='truncate'>{name}</span>
        </>
    )
}

interface ImageBoard {
    id: string
    name: string
    thumbnail: string
}
interface BoardSelectorProps {
    boards: ImageBoard[]
}
const BoardSelector: React.FC<BoardSelectorProps> = ({ boards }) => {
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelectedItem] = useState<ImageBoard | null>(null)

    const handleMouseEnter = () => {
        setOpen(true)
    }

    const handleMouseLeave = () => {
        setOpen(false)
    }

    const handleItemClick = (item: ImageBoard) => {
        setSelectedItem(item)
        setOpen(false)
    }

    return (
        <div
            className={`w-full transition-all duration-200 ease-in-out overflow-scroll ${isOpen ? 'max-h-48' : 'max-h-24'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isOpen ? (
                // Show all items when hovering
                <div className=''>
                    {boards.map((item, i) => (
                        <button
                            onClick={() => handleItemClick(item)}
                            key={i}
                            className={`w-full text-left flex items-center space-x-2 p-2 rounded-xl ${
                                selected != null && selected.id === item.id ? 'bg-background2' : ''
                            }`}
                        >
                            <ImageBoard name={item.name} thumbnail={item.thumbnail} />
                        </button>
                    ))}
                </div>
            ) : (
                // Show only selected item when not hovering
                <div className='h-fit'>
                    {selected ? (
                        <div className='w-full text-left flex items-center space-x-2 rounded-xl p-2'>
                            <ImageBoard name={selected.name} thumbnail={selected.thumbnail} />
                        </div>
                    ) : (
                        <div className='text-gray-500'>Hover to select an item</div>
                    )}
                </div>
            )}
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

                        <div className='grid grid-cols-[auto_5fr_4fr_auto] gap-2 items-center'>
                            <Label htmlFor='seed'>Seed</Label>
                            <Input id='seed' type='number' className='text-center' min={0} defaultValue={42} />
                            <Button>
                                <ShuffleIcon />
                                Shuffle Seed
                            </Button>
                            <div className='flex justify-around space-x-2 items-center w-full'>
                                <Switch id='lockSeed' />
                                <Label htmlFor='lockSeed'>Lock</Label>
                            </div>

                            <Label htmlFor='subSeed'>Sub Seed</Label>
                            <Input id='subSeed' type='number' className='text-center' min={0} defaultValue={7} />
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

            <div className='bg-background3 rounded-md flex flex-col w-1/4 overflow-y-scroll h-full px-2 pb-2'>
                <header className='flex sticky items-center gap-2 top-0 z-10 bg-inherit py-2 flex-col'>
                    <div className='flex w-full items-center space-x-2'>
                        <div className='grid w-full grid-cols-2 gap-2'>
                            <Button className='rounded-full h-10'>
                                <CloudDownloadIcon />
                                Download
                            </Button>
                            <Button className='rounded-full h-10' variant='destructive'>
                                <TrashIcon />
                                Delete
                            </Button>
                        </div>

                        <Select>
                            <SelectTrigger className='flex-grow'>
                                <SelectValue placeholder='Image Size' defaultValue={SCHEDULERS[0]} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='small'>Small</SelectItem>
                                <SelectItem value='medium'>Medium</SelectItem>
                                <SelectItem value='large'>Large</SelectItem>
                                <SelectItem value='xl'>XL</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <span className='text-2xl text-left w-full'>Boards:</span>
                    <div className='w-full px-2'>
                        <BoardSelector
                            boards={[
                                { id: 'd8d78175-757c-43e1-81ea-a1d9398d11f5', name: 'Board 1', thumbnail: 'https://picsum.photos/256/256' },
                                { id: '251d7ab8-6ab0-46f8-8629-8ec78a9e04dc', name: 'Board 2', thumbnail: 'https://picsum.photos/256/256' },
                                { id: 'cbdb4669-e1f3-4d3d-a47a-3a05c26db016', name: 'Board 3', thumbnail: 'https://picsum.photos/256/256' },
                                { id: '75f4ed77-b6a2-47f5-b772-e5a6fee1219b', name: 'Board 4', thumbnail: 'https://picsum.photos/256/256' },
                                { id: '9d0fe868-d153-4af8-a7ef-9a005da6ee8a', name: 'Board 5', thumbnail: 'https://picsum.photos/256/256' },
                            ]}
                        />
                    </div>
                </header>

                <div className='grid grid-cols-4 gap-2'>
                    {[...Array(102).keys()].map((i) => (
                        <img
                            className='w-full aspect-square object-cover rounded'
                            key={i}
                            src={`https://picsum.photos/256/512`}
                            alt='random'
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
