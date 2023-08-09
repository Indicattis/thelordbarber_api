import Image from 'next/image'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'The Lord Barber',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
            <link rel="icon" href="/ico/favicon.ico" />
            <meta property="og:image" content="/devline/devline-logo.png" />
        </head>
      <body className='font-sans min-h-screen'>
        {children}
      <footer
            className="bg-darkTheme absolute bottom-[-200px]
            w-full text-whiteColor
            text-sm flex flex-col
            font-poppins items-center"
        >
            <div className="w-full text-sm text-zinc-400">
                <div className="grid grid-cols-3 gap-2 w-full justify-around items-center p-5">
                    <div>Suporte</div>
                    <div>Sobre nós</div>
                    <div>Contato</div>
                    <div>Termos de uso</div>
                    <div>Políticas de privacidade</div>
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
