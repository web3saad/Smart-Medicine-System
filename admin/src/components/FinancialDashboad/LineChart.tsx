
import { LineChart } from "@mui/x-charts/LineChart";

const onlineData = [40000, 30000, 20000, 27800, 18090, 23090, 34900];
const offlineData = [14000, 13928, 9800, 13908, 14800, 17800, 14300];
const xLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];



export default function LineChartComponent() {
  return (
    <LineChart
      width={650}
      height={300}
      series={[
        { data: onlineData, label: "Online" ,color:"blue"},
        { data: offlineData, label: "Offline",color:"red" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
    />
  );
}


