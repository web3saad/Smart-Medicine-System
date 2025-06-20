import { useEffect, useState } from "react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import MonthlySellComponent from "./MonthlySellComponent";
import SellComponents from "./SellComponents";

import LineChart from "./LineChart";
import PieChartComponent from "./PieChartComponent";

const FinancialDashboardV2 = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showNextDay, setShowNextDay] = useState(false);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDateWithoutTime = new Date(currentDate);
    currentDateWithoutTime.setHours(0, 0, 0, 0);
    if (currentDateWithoutTime.getTime() === today.getTime()) {
      setShowNextDay(false);
    } else {
      setShowNextDay(true);
    }
  }, [currentDate]);

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const today = new Date();
    if (nextDay <= today) {
      setCurrentDate(nextDay);
    } else {
      setCurrentDate(today);
    }
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-between w-full bg-sky-50  lg:px-5 md:px-5 p-2 ">
      <div className=" w-4/6">
        <div className="h-80 bg-white rounded-lg shadow-lg mr-4 p-2 py-2 mb-4">
          <div className="flex justify-between text-xl font-semibold px-2 text-blue-800">
            <p>Today's sell</p>
            <p>{formattedDate}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="text-blue-700 cursor-pointer flex mr-5 justify-end items-center text-sm font-semibold"
              onClick={handlePreviousDay}
            >
              <FaRegArrowAltCircleLeft className="mr-1" />
              Previous Day
            </button>
            {showNextDay && (
              <button
                className="text-blue-700 cursor-pointer flex justify-end items-center text-sm font-semibold"
                onClick={handleNextDay}
              >
                Next Day
                <FaRegArrowAltCircleRight className="ml-1" />
              </button>
            )}
          </div>

          <div className="flex justify-between text-xl font-semibold mt-3  text-blue-800">
            <div className="w-4/6 px-2">
              <SellComponents />
            </div>
            <div className="w-3/6  h-64 flex justify-center">
              <PieChartComponent
                colorOffline="blue"
                colorOnline="purple"
                valueOffline={2500}
                valueOnline={1500}
              />
            </div>
          </div>
        </div>
        <div className="h-auto bg-white rounded-lg shadow-lg mr-4 mt-8 p-2 mb-4">
          <div className="    text-xl font-semibold px-2 text-blue-800 ">
            <p> Revenue Visualisation of Past 6 Months</p>

            <LineChart />
          </div>
        </div>
      </div>
      <div className="w-2/6">
        <div className="h-96 bg-white rounded-lg shadow-lg mr-4 p-2 mb-4">
          <p className="text-xl font-semibold px-2 text-blue-800">
            Current Month’s Sell
          </p>
          <div className=" text-xl font-semibold px-2 text-blue-800">
            <MonthlySellComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboardV2;
