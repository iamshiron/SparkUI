'use client'

// This page is mostly used for theme testing and component demos.

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'

import { ThemeSwitcher } from '@/components/ui/theme-switcher'

export default function Home() {
    return (
        <main className='container mx-auto p-4'>
            <ThemeSwitcher />

            <h1 className='text-4xl font-bold mb-8 text-primary'>ShadCN Demo Components</h1>

            <div className='grid gap-8'>
                <section>
                    <h2 className='text-2xl font-semibold mb-4'>Buttons</h2>
                    <div className='flex flex-wrap gap-4'>
                        <Button>Default Button</Button>
                        <Button variant='secondary'>Secondary Button</Button>
                        <Button variant='destructive'>Destructive Button</Button>
                        <Button variant='outline'>Outline Button</Button>
                        <Button variant='ghost'>Ghost Button</Button>
                        <Button variant='link'>Link Button</Button>
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className='text-2xl font-semibold mb-4'>Card</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <Button>Card Action</Button>
                        </CardFooter>
                    </Card>
                </section>

                <Separator />

                <section>
                    <h2 className='text-2xl font-semibold mb-4'>Tabs</h2>
                    <Tabs defaultValue='account' className='w-[400px]'>
                        <TabsList>
                            <TabsTrigger value='account'>Account</TabsTrigger>
                            <TabsTrigger value='password'>Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value='account'>Make changes to your account here.</TabsContent>
                        <TabsContent value='password'>Change your password here.</TabsContent>
                    </Tabs>
                </section>

                <Separator />

                <section>
                    <h2 className='text-2xl font-semibold mb-4'>Input</h2>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='email' id='email' placeholder='Email' />
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className='text-2xl font-semibold mb-4'>Badge</h2>
                    <div className='flex flex-wrap gap-4'>
                        <Badge>Default</Badge>
                        <Badge variant='secondary'>Secondary</Badge>
                        <Badge variant='outline'>Outline</Badge>
                        <Badge variant='destructive'>Destructive</Badge>
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className='text-2xl font-semibold mb-4'>Switch</h2>
                    <div className='flex items-center space-x-2'>
                        <Switch id='switch' />
                        <Label htmlFor='switch'>Switch</Label>
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className='text-2xl font-semibold mb-4'>Slider</h2>
                    <Slider defaultValue={[33]} max={100} step={1} />
                </section>

                <Separator />

                <section>
                    <h2 className='text-2xl font-semibold mb-4'>Toggle</h2>
                    <Toggle aria-label='Toggle italic'>Italic</Toggle>
                </section>
            </div>
        </main>
    )
}
