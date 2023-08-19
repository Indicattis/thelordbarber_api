
const title = 'Sobre a Devline: Elevando Negócios Através de APIs Web e Mobile desde 2022'
const intro = 'Contato'
const firstPar = 'Se você tiver alguma dúvida ou preocupação sobre estes Termos ou o Serviço, entre em contato conosco em [inserir endereço de contato ou formulário de contato].'
const firstPoint = 'Agradecemos por escolher a The Lord Barber. Esperamos que desfrute de nossa plataforma de Agendamento Online e aguardamos ansiosamente por sua visita.'
const secondPoint = '#TheLordBarber #TermosDeUso #AgendamentoOnline #CortesDeCabelo #BarbaPerfeita'

export default function Contact() {
    return (
        <div className="flex flex-col gap-3 p-3 text-sm bg-darkTheme border border-zinc-800">
            <div className="font-bold text-base">
                {title}
            </div>
            <div className="text-lg">
                {intro}
            </div>
            <div>
                {firstPar}
            </div>
            <div>
                {firstPoint}
            </div>
            <div>
                {secondPoint}
            </div>
        </div>
    )
}