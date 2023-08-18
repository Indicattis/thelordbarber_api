import QRCodeDisplay from "@/components/content/dashboard/Bot"
import AgendamentosDia from "@/components/content/dashboard/Home/AgendamentosDia"
import DashboardPainel from "@/components/content/dashboard/Home/PainelAgendamentos"

interface DashboardHomeProps {
    cargo: string
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}


export default function DashboardHome(props:DashboardHomeProps) {
    return (
        <div className="w-full flex gap-5 flex-col">
            <div className="w-full flex gap-5 max-lg:flex-col">
                <DashboardPainel></DashboardPainel>
                <AgendamentosDia feedbackToggle={(type, message) => props.feedbackToggle(type, message)}></AgendamentosDia>
            </div>
            <QRCodeDisplay></QRCodeDisplay>
        </div>
    )
} 