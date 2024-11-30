'use client'

import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts";

interface PieChartSummaryProps{
    title: string
    data: {
        value: number,
        label: string,
        color: string
    }[]
}

export default function PieChartSummary(props: PieChartSummaryProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100); // Delay untuk smooth transition
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="flex flex-col items-center">
            <p className="gray-400">{props.title}</p>
            <div className="relative">
                <p className={"absolute bottom-[138px] left-[112px] text-3xl font-bold text-green-500 " + ` transition-opacity duration-600 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{props.data[0].value}</p>
                <PieChart
                    series={[
                        {
                            innerRadius:52,
                            outerRadius: 80,
                            data: props.data.map((d, i)=>(
                                {
                                    id: i,
                                    value: d.value,
                                    label: d.label + ": " + d.value,
                                    color: d.color
                                }
                            )),
                        },
                    ]}
                    width={250}
                    height={250}
                    margin={{ right: 0, top: -60 }}
                    slotProps={{
                        legend:{
                            labelStyle: {
                                tableLayout: 'fixed',
                            },
                            position: {
                                horizontal: 'middle',
                                vertical: 'bottom',
                            },
                        }
                    }}
                />
            </div>
        </div>
    );
}