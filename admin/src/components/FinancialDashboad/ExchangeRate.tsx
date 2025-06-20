/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const currenciesToShow = ["INR", "EUR", "BHD", "GBP", "CAD", "USD"];
interface ExchangeRateData {
  // Define the structure of exchange rate data here
  // For example:
  USD: number;
  EUR: number;
  rates:any;
  // Add other currency properties as needed
}
const ExchangeRate = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://cdn.moneyconvert.net/api/latest.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();
        setExchangeRates(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-2 px-2">
      <div className="grid grid-cols-3 gap-4">
        {currenciesToShow.map((currencyCode) => (
          <div key={currencyCode} className="text-blue-700 font-medium text-xl">
            {exchangeRates?.rates[currencyCode] && (
              <p>{exchangeRates?.rates[currencyCode].toFixed(4)}</p>
            )}
            <p className="text-sm">{currencyCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRate;
