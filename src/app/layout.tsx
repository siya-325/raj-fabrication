import type { Metadata } from 'next'
import { Manrope, Space_Mono } from 'next/font/google'
import './globals.css'
import { MotionProvider } from '@/components/motion/MotionProvider'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'Raj Fabrication | Custom Metalwork in Ahmedabad',
  description: 'Custom fabrication, welding, and practical metalwork from Raj Fabrication in Satellite, Ahmedabad.',
  icons: {
    icon: '/logo/favicon.png',
    shortcut: '/logo/favicon.png',
    apple: '/logo/favicon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${manrope.variable} ${spaceMono.variable}`}>
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
