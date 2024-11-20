import { PieChart } from "@mui/x-charts";

interface PieChartSummaryProps{
    title: string
    data: {
        value: number,
        label: string,
        color: string,
        textColor: string,
    }[]
}

export default function PieChartSummary(props: PieChartSummaryProps) {
  return (
    <div className="flex flex-col items-center">
        <p className="gray-400">{props.title}</p>
        <div className="relative">
            <p className={"absolute bottom-[138px] left-[112px] text-3xl font-bold " + props.data[0].textColor}>{props.data[0].value}</p>
            <PieChart
                series={[
                    {
                        innerRadius:50,
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
                        direction: 'row',
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