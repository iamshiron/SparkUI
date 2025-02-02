import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

interface RootLayoutProps {
    meta: Metadata
    children: React.ReactNode
}

export default function RootLayout({ children, meta }: RootLayoutProps) {
    return (
        <>
            <html lang='en' suppressHydrationWarning>
                <head />
                <body className='bg-background'>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
