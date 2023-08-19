
const title = 'Políticas de Privacidade - Agendamento Online'
const lastMod = 'Última Atualização: 19/08/2023'
const intro = 'Bem-vindo as Políticas de Privacidade da The Lord Barber!'
const firstPar = 'Respeitamos sua privacidade e protegemos suas informações pessoais de acordo com nossa Política de Privacidade. A transmissão de informações via internet não é completamente segura e, embora tomemos medidas para proteger seus dados, não podemos garantir a segurança de suas informações transmitidas para o Serviço.'
const firstPoint = 'Todo o conteúdo apresentado no Serviço, incluindo imagens, textos, logotipos e outros materiais, é protegido por direitos autorais e outras leis de propriedade intelectual. Você concorda em não reproduzir, distribuir, modificar ou criar obras derivadas do conteúdo sem autorização expressa da The Lord Barber.'
const secondPoint = 'A The Lord Barber se reserva o direito de modificar ou atualizar estes Termos a qualquer momento. É sua responsabilidade revisar regularmente os Termos para se manter informado sobre quaisquer alterações. O uso contínuo do Serviço após a publicação de quaisquer alterações constitui sua aceitação dessas mudanças.'


export default function Privacity() {
    return (
        <div className="flex flex-col gap-3 p-3 text-sm bg-darkTheme border border-zinc-800">
            <div className="font-bold text-base">
                {title}
            </div>
            <div className="italic">
                {lastMod}
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