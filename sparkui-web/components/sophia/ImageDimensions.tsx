import { useState, useRef, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { ArrowRightLeftIcon } from 'lucide-react'

const aspectRatios = [
    { value: '1:1', label: '1:1' },
    { value: '4:3', label: '4:3' },
    { value: '7:6', label: '7:6' },
    { value: '16:9', label: '16:9' },
    { value: 'custom', label: 'Custom' },
]

const snapTo8 = (value: number) => Math.max(8, Math.round(value / 8) * 8)

export function ImageDimensions() {
    const [width, setWidth] = useState(1024)
    const [height, setHeight] = useState(1024)
    const [aspectRatio, setAspectRatio] = useState('1:1')
    const [swapped, setSwapped] = useState(false)
    const [inputWidth, setInputWidth] = useState(width.toString())
    const [inputHeight, setInputHeight] = useState(height.toString())

    const updateDimension = (dimension: 'width' | 'height', value: number) => {
        const snappedValue = snapTo8(value)

        if (dimension === 'width') {
            setWidth(snappedValue)
            setInputWidth(snappedValue.toString())
            if (aspectRatio !== 'custom') {
                const [w, h] = aspectRatio.split(':').map(Number)
                const newHeight = swapped ? snapTo8((snappedValue * w) / h) : snapTo8((snappedValue * h) / w)
                setHeight(newHeight)
                setInputHeight(newHeight.toString())
            }
        } else {
            setHeight(snappedValue)
            setInputHeight(snappedValue.toString())
            if (aspectRatio !== 'custom') {
                const [w, h] = aspectRatio.split(':').map(Number)
                const newWidth = swapped ? snapTo8((snappedValue * h) / w) : snapTo8((snappedValue * w) / h)
                setWidth(newWidth)
                setInputWidth(newWidth.toString())
            }
        }
    }

    const handleInputChange = (dimension: 'width' | 'height', value: string) => {
        if (dimension === 'width') {
            setInputWidth(value)
        } else {
            setInputHeight(value)
        }
    }

    const handleInputBlur = (dimension: 'width' | 'height') => {
        const value = dimension === 'width' ? inputWidth : inputHeight
        const numValue = Number.parseInt(value) || 8
        updateDimension(dimension, numValue)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, dimension: 'width' | 'height') => {
        if (e.key === 'Enter') {
            handleInputBlur(dimension)
        }
    }

    const handleAspectRatioChange = (newRatio: string) => {
        setAspectRatio(newRatio)
        if (newRatio !== 'custom') {
            const [w, h] = newRatio.split(':').map(Number)
            const newHeight = swapped ? snapTo8((width * w) / h) : snapTo8((width * h) / w)
            setHeight(newHeight)
            setInputHeight(newHeight.toString())
        }
    }

    const handleSwap = () => {
        const tempWidth = width
        setWidth(height)
        setHeight(tempWidth)
        setInputWidth(height.toString())
        setInputHeight(tempWidth.toString())
        setSwapped(!swapped)
    }

    useEffect(() => {
        if (aspectRatio !== 'custom') {
            const [w, h] = aspectRatio.split(':').map(Number)
            const newHeight = swapped ? snapTo8((width * w) / h) : snapTo8((width * h) / w)
            setHeight(newHeight)
            setInputHeight(newHeight.toString())
        }
    }, [aspectRatio, width, swapped])

    return (
        <div className='flex space-x-2'>
            <div className='flex flex-col space-y-2 w-full'>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <Label htmlFor='aspect-ratio' className='text-nowrap'>
                            Aspect Ratio
                        </Label>
                        <Select value={aspectRatio} onValueChange={handleAspectRatioChange}>
                            <SelectTrigger id='aspect-ratio'>
                                <SelectValue placeholder='Select aspect ratio' />
                            </SelectTrigger>
                            <SelectContent>
                                {aspectRatios.map((ratio) => (
                                    <SelectItem key={ratio.value} value={ratio.value}>
                                        {ratio.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className='w-12 h-8 p-0' onClick={handleSwap} title='Swap dimensions'>
                            <ArrowRightLeftIcon />
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <Label htmlFor='width'>Width</Label>
                    <div className='flex items-center space-x-4'>
                        <Slider
                            id='width-slider'
                            min={8}
                            max={4096}
                            step={8}
                            value={[width]}
                            onValueChange={(value) => updateDimension('width', value[0])}
                        />
                        <Input
                            id='width'
                            type='number'
                            min={8}
                            max={4096}
                            value={inputWidth}
                            onChange={(e) => handleInputChange('width', e.target.value)}
                            onBlur={() => handleInputBlur('width')}
                            onKeyDown={(e) => handleInputKeyDown(e, 'width')}
                            className='w-20'
                        />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <Label htmlFor='height'>Height</Label>
                    <div className='flex items-center space-x-4'>
                        <Slider
                            id='height-slider'
                            min={8}
                            max={4096}
                            step={8}
                            value={[height]}
                            onValueChange={(value) => updateDimension('height', value[0])}
                        />
                        <Input
                            id='height'
                            type='number'
                            min={8}
                            max={4096}
                            value={inputHeight}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                            onBlur={() => handleInputBlur('height')}
                            onKeyDown={(e) => handleInputKeyDown(e, 'height')}
                            className='w-20'
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center'>
                <AspectRatioVisualizer width={width} height={height} />
            </div>
        </div>
    )
}

interface AspectRatioVisualizerProps {
    width: number
    height: number
}
const AspectRatioVisualizer: React.FC<AspectRatioVisualizerProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        const aspectRatio = width / height
        let rectWidth, rectHeight

        if (aspectRatio > 1) {
            rectWidth = canvasWidth
            rectHeight = canvasWidth / aspectRatio
        } else {
            rectHeight = canvasHeight
            rectWidth = canvasHeight * aspectRatio
        }

        const x = Math.round((canvasWidth - rectWidth) / 2)
        const y = Math.round((canvasHeight - rectHeight) / 2)

        // Clear the canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        // Draw grid lines and border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)' // Semi-transparent white
        ctx.lineWidth = 1

        // Vertical lines
        const thirdX = rectWidth / 3
        ctx.beginPath()
        ctx.moveTo(x + thirdX, y)
        ctx.lineTo(x + thirdX, y + rectHeight)
        ctx.moveTo(x + 2 * thirdX, y)
        ctx.lineTo(x + 2 * thirdX, y + rectHeight)
        ctx.stroke()

        // Horizontal lines
        const thirdY = rectHeight / 3
        ctx.beginPath()
        ctx.moveTo(x, y + thirdY)
        ctx.lineTo(x + rectWidth, y + thirdY)
        ctx.moveTo(x, y + 2 * thirdY)
        ctx.lineTo(x + rectWidth, y + 2 * thirdY)
        ctx.stroke()

        // Draw border
        ctx.strokeStyle = 'white' // Solid white for the border
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, rectWidth, rectHeight)
    }, [width, height])

    return (
        <div className='space-y-2'>
            <canvas ref={canvasRef} width={200} height={200}></canvas>
        </div>
    )
}
