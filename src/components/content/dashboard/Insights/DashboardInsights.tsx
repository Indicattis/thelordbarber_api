import Previstos from "@/components/content/dashboard/Insights/Previstos";
import Recorrentes from "@/components/content/dashboard/Insights/Recorrentes";
import Resume from "@/components/content/dashboard/Insights/Resume";
import { Box } from "@/components/content/dashboard/utils/Layout";




export default function DashboardInsights() {
    return (
        <Box>
            <div className="flex w-full flex-col gap-5">
                <Resume></Resume>
                <Previstos/>
                <Recorrentes/>
            </div>
        </Box>
    )
}