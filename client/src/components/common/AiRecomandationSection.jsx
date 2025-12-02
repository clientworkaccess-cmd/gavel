import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AiRecomandationSection({ score , analysis}) {
    const data = {
        labels: ["Fit Score", "Remaining"],
        datasets: [
            {
                data: [score, 100 - score],
                backgroundColor: ["#1eb108", "#ff3b3b"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "65%",
        plugins: {
            legend: { display: false },
        },
    };

    return (
        <Card className="w-full border-foreground/60 bg-transparent">
            <CardHeader>
                <CardTitle className="text-white text-lg">
                    AI Recommendation
                </CardTitle>
            </CardHeader>

            <CardContent className="flex lg:flex-row-reverse flex-col items-center space-y-4 justify-between pt-0">
                <div className="w-25 h-25 xl:w-30 xl:h-30">
                    <Doughnut data={data} options={options} />
                </div>
                <div>
                    <span className="text-xl font-bold ">
                        {analysis}
                    </span>

                    <p className="text-gray-400 text-sm mt-2">
                        Based on interview analysis.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
