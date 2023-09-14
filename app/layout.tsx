import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SubabaseProvider from '@/providers/SupabaseProvider'
import Sidebar from '@/components/Sidebar'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SubabaseProvider>
          <Sidebar>
            {children}
          </Sidebar>
        </SubabaseProvider>
      </body>
    </html>
  )
}
