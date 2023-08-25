import Image from 'next/image';

export default function Footer() {
    return (
        <footer
                className="bg-darkTheme mt-20
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
    );
}
