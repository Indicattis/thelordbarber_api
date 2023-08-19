
import Image from 'next/image'
import './globals.css'
import type { Metadata } from 'next'
import Modal from '@/components/modal/ModalController'
import Header from '@/components/header/Header'


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
        <body className='font-sans min-h-screen'>
            <Header></Header>
            {children}
            <footer
                className="bg-darkTheme absolute bottom-[-200px]
                w-full text-whiteColor
                text-sm flex flex-col
                font-poppins items-center"
            >
                <div className="w-full text-sm text-zinc-400 max-md:hidden">
                    <div className="flex flex-col gap-2 w-full justify-around items-center p-5">
                        <a href='/usage'>Políticas de privacidade</a>
                        <a href='/usage'>Termos de uso</a>
                        <a href='/usage'>Sobre nós</a>
                        <a href='/usage'>Suporte</a>
                    </div>
                </div>

                <div className="flex flex-col gap-5 ">
                    <div className="flex gap-1 items-center">
                        <Image
                            src="/devline/devline-logo.png"
                            alt=""
                            width={70}
                            height={70}
                            className="rounded-full"
                        />

                        <div className="text-lg">@DevLineRS</div>
                    </div>
                </div>
                <div className='text-[9px] text-zinc-400'>@All Copyright Reserved</div>
            </footer>
        </body>
    </html>
  )
}
