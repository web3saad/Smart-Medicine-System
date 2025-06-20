import { CiTablets1 } from "react-icons/ci";
import { FaLongArrowAltUp } from "react-icons/fa";
import PieChartComponent from "./PieChartComponent";

interface SellItemProps {
  online: number | string | null;
  counter: number | string | null;
  icon: React.ReactNode;
  icon2: React.ReactNode;
}

const SellItem: React.FC<SellItemProps> = ({
  online,
  counter,
  icon,
  icon2,
}) => {
  const formatValue = (value: unknown) => {
    if (value != null) {
      return Number(value).toFixed(2);
    }
  };

  return (
    <div className="flex justify-between text-black bg-teal-200 px-2 py-5 rounded-lg mt-2 ">
      <p className="flex">
        {formatValue(online) || 0.0}
        <p className="text-green-300 text-2xl hidden"> {icon2}</p>
      </p>
      {icon}
      <p className="flex">{formatValue(counter) || 0.0}</p>
    </div>
  );
};

const MonthlySellComponent = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-between font-medium mt-2 mx-2  mb-2">
        <p>Online</p>

        <p>Offline</p>
      </div>

      <SellItem
        online="7845914"
        counter="4554545"
        icon={<CiTablets1 />}
        icon2={<FaLongArrowAltUp />}
      />
      <div className="flex justify-center mt-5">
        <PieChartComponent
          colorOffline="cyan"
          colorOnline="blue"
          valueOffline={5000}
          valueOnline={10000}
        />
      </div>
    </div>
  );
};

export default MonthlySellComponent;
