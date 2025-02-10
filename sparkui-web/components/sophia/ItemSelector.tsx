'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'

import framer from 'framer-motion'

interface Item {
    id: string
    name: string
    version: string
    thumbnail: string
    selected: boolean
    onSelect: () => void
}
const Item: React.FC<Item> = ({ id, name, version, thumbnail, selected, onSelect }) => {
    return (
        <button
            className={`
                relative h-56 w-full overflow-hidden rounded-lg border-2
                transition-all duration-300 ease-in-out
                ${selected ? 'border-secondary' : 'border-background'}
            `}
            onClick={onSelect}
        >
            <div
                className={`
                w-full h-full transition-transform duration-300 ease-in-out
                ${selected ? 'scale-110' : 'scale-100'}
            `}
            >
                <img className='h-full w-full object-cover rounded' src={thumbnail} alt={name} />
            </div>
            <div className='absolute inset-x-0 bottom-0 flex items-center justify-center'>
                <span className='bg-black/50 text-white px-3 py-2 w-full text-center rounded-b'>{name}</span>
            </div>
        </button>
    )
}

export interface ModalProps {
    open: boolean
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    onClose: () => void
    onSelect: (selected: string) => void
}

export const ItemSelector: React.FC<ModalProps> = ({ open, onClose, onSelect, size }) => {
    const [selected, setSelected] = useState<string>('')

    const sizeClasses =
        size === 'xs'
            ? 'left-[56rem] right-[56rem] top-[24rem] bottom-[24rem]'
            : size === 'sm'
            ? 'left-[48rem] right-[48rem] top-[20rem] bottom-[20rem]'
            : size === 'md'
            ? 'left-[40rem] right-[40rem] top-[16rem] bottom-[16rem]'
            : size === 'lg'
            ? 'left-[32rem] right-[32rem] top-[12rem] bottom-[12rem]'
            : 'left-[24rem] right-[24rem] top-[8rem] bottom-[8rem]'

    useEffect(() => {
        console.log(`Selected: ${selected}`)
    }, [selected])

    return open ? (
        <div
            className='fixed z-40 inset-0 top-0 right-0 bottom-0 left-0 bg-black/80 pointer-events-auto animate-in fade-in duration-300'
            onClick={onClose}
        >
            <div
                className={`flex flex-col absolute z-50 rounded-lg ${sizeClasses} bg-background animate-in slide-in-from-bottom-4 duration-500`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='z-[80]'>
                    <div className='h-20 flex rounded-t-lg items-center justify-between bg-primary p-4'>
                        <span className='text-3xl'>Select an Item...</span>
                        <button
                            className='flex justify-center rounded-lg w-12 h-12 bg-primary hover:bg-destructive/80 border-foreground m-0 items-center transition-colors'
                            onClick={onClose}
                        >
                            <XIcon size={32} />
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-10 gap-4 p-4 w-full h-full items-center overflow-y-scroll'>
                    {[...Array(150)].map((_, i) => (
                        <Item
                            key={i}
                            selected={selected === `${i}`}
                            onSelect={() => setSelected(selected === `${i}` ? '' : `${i}`)}
                            id='abcd'
                            name={`Item ${i + 1}`}
                            version='0.0'
                            thumbnail='https://picsum.photos/768/1024'
                        />
                    ))}
                </div>

                <div className='h-20 bg-background2 flex items-center justify-between p-4 rounded-b-lg'>
                    <div className='flex flex-grow'></div>
                    <div className='flex space-x-2'>
                        <Button className='w-40 h-12' disabled={selected === ''}>
                            Select
                        </Button>
                        <Button className='w-40 h-12' variant='destructive'>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
