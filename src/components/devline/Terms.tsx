const content = '  Bem-vindo aos Termos de Uso da The Lord Barber! Estes Termos de Uso ("Termos") regem o uso do nosso serviço de Agendamento Online, disponibilizado através do website https://thelordbarber.devliners.com.br/ (o "Serviço") operado pela The Lord Barber. Ao utilizar o Serviço, você concorda em cumprir e estar vinculado a estes Termos. Caso você não concorde com alguma parte destes Termos, por favor, não continue a utilizar o Serviço. 1. Uso do Serviço Ao utilizar nosso Serviço, você declara que possui pelo menos 18 anos de idade ou está usando o Serviço com o consentimento de um responsável legal. Você concorda em fornecer informações verdadeiras, precisas, atuais e completas ao agendar seus serviços. 2. Reservas e Agendamentos O Serviço permite que você reserve horários para cortes de cabelo, barba e serviços relacionados oferecidos pela The Lord Barber. Você concorda em respeitar os horários agendados e a chegar pontualmente para o seu compromisso. A The Lord Barber reserva o direito de recusar ou reagendar serviços por qualquer motivo. 3. Cancelamento e Não Comparecimento Se você precisar cancelar ou reagendar seu compromisso, pedimos que faça isso com pelo menos [número de horas] horas de antecedência. Caso contrário, a The Lord Barber reserva o direito de cobrar uma taxa de não comparecimento.'



const title = 'Termos de Uso da The Lord Barber - Agendamento Online'
const lastMod = 'Última Atualização: 19/08/2023'
const intro = 'Bem-vindo aos Termos de Uso da The Lord Barber!'
const firstPar = 'Estes Termos de Uso ("Termos") regem o uso do nosso serviço de Agendamento Online, disponibilizado através do website https://thelordbarber.devliners.com.br/ (o "Serviço") operado pela The Lord Barber. Ao utilizar o Serviço, você concorda em cumprir e estar vinculado a estes Termos. Caso você não concorde com alguma parte destes Termos, por favor, não continue a utilizar o Serviço.'
const firstPoint = 'Ao utilizar nosso Serviço, você declara que possui pelo menos 18 anos de idade ou está usando o Serviço com o consentimento de um responsável legal. Você concorda em fornecer informações verdadeiras, precisas, atuais e completas ao agendar seus serviços.'
const secondPoint = 'O Serviço permite que você reserve horários para cortes de cabelo, barba e serviços relacionados oferecidos pela The Lord Barber. Você concorda em respeitar os horários agendados e a chegar pontualmente para o seu compromisso. A The Lord Barber reserva o direito de recusar ou reagendar serviços por qualquer motivo.'
const thirdPoint = 'Se você precisar cancelar ou reagendar seu compromisso, pedimos que faça isso com pelo menos 24 horas de antecedência. Caso contrário, a The Lord Barber reserva o direito de cobrar uma taxa de não comparecimento.'


export default function Terms() {
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
            <div>
                {thirdPoint}
            </div>
        </div>
    )
}