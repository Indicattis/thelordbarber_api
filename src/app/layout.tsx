
import Image from 'next/image'
import './globals.css'
import type { Metadata } from 'next'
import Modal from '@/components/modal/ModalController'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'


export const metadata: Metadata = {
  title: 'The Lord Barber',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
})
 {
  return (
    <html lang="en">
        <head>
            <link rel="icon" href="/ico/favicon.ico" />
            <meta property="og:image" content="/img/Logo.jpeg" />
        </head>
        <body className='font-sans min-h-screen flex flex-col justify-between'>
            <Header></Header>
            {children}
            <Footer></Footer>
        </body>
    </html>
  )
}
