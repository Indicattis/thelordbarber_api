import Previstos from "@/components/content/dashboard/Insights/Previstos";
import { Box } from "@/components/content/dashboard/utils/Layout";




export default function DashboardInsights() {
    return (
        <Box>
            <div className="flex w-full max-md:flex-col gap-5">
                <Previstos/>
            </div>
        </Box>
    )
}