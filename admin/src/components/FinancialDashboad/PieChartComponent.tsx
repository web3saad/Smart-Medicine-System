import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
type IPieChartComponentTypes = {
  valueOnline: number;
  valueOffline: number;
  colorOnline: string;
  colorOffline: string;
};
const PieChartComponent: React.FC<IPieChartComponentTypes> = ({
  valueOnline,
  valueOffline,
  colorOnline,
  colorOffline,
}) => {
  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };

  return (
    <div className="px-1">
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label}`,
            arcLabelMinAngle: 15,

            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            data: [
              {
                id: 0,
                label: "Online",
                value: valueOnline,
                color: colorOnline,
              },
              {
                id: 1,
                label: "Offline",
                value: valueOffline,
                color: colorOffline,
              },
            ],
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        {...sizing}
      />
    </div>
  );
};

export default PieChartComponent;
