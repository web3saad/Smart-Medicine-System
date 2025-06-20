/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons";
type ISalesCardTypes = {
  icon?: IconType;
  ammount?: string;
  salesTitle?: string;
  saleRate?: string;
  position?: string;
  className?: string;
};

const SalesCard: React.FC<ISalesCardTypes> = ({
  icon: Icon,
  ammount,
  salesTitle,
  saleRate,
  position,
  className,
}) => {
  return (
    <div className="flex flex-col items-center cursor-pointer bg-cyan-200  p-4 rounded-lg">
      {Icon && <Icon className={` ${className} text-3xl mb-2`} />}
      <p className="text-xl">{ammount}</p>
      <p className="">{salesTitle}</p>
      <p className="hover:underline text-blue-800">
        {position}
        {saleRate}% from yesterday
      </p>
    </div>
  );
};

export default SalesCard;
