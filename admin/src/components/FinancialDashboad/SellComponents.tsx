/* eslint-disable @typescript-eslint/no-explicit-any */

import { CiTablets1 } from "react-icons/ci";
import { FaLongArrowAltUp } from "react-icons/fa";

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
}) => {
  const formatValue = (value: any) => {
    if (value != null) {
      return Number(value).toFixed(2);
    }
  };

  return (
    <div className="flex justify-between text-black bg-sky-200 px-2 py-10 rounded-lg mt-2 ">
      <p className="flex">{formatValue(online) || 0.0}</p>
      <p className="text-4xl text-teal-600"> {icon}</p>
      <p className="flex">{formatValue(counter) || 0.0}</p>
    </div>
  );
};

const SellComponents = () => {
  return (
    <div className="h-64">
      <div className="flex justify-between font-medium mx-2">
        <p className="flex items-center ">Online</p>
        <p className="flex items-center">Offline</p>
      </div>

      <SellItem
        online="7845914"
        counter="4554545"
        icon={<CiTablets1 />}
        icon2={<FaLongArrowAltUp />}
      />
    </div>
  );
};

export default SellComponents;
