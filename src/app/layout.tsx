'use client'

import { Inter, Karla } from 'next/font/google'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { AuthContextProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })
const karla = Karla({
   subsets: ['latin'],
   weight: ['500','700']
  })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${karla.className}`}>
        <CacheProvider>
          <ChakraProvider>
            <AuthContextProvider>
              {children}
            </AuthContextProvider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
