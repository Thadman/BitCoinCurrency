import React, { useState, useEffect } from "react";
import currencies from "./supported-currencies.json";
import { Line } from "react-chartjs-2";

const App = () => {
  const defaultCurrency = "AUD";
  const [currency, setCurrency] = useState(defaultCurrency);
  const [bitcoinData, setBitcoinData] = useState({});

  const onOptionChange = (event) => {
    setCurrency(event.target.value);
  };

  const bitcoinApi = "https://api.coindesk.com/v1/bpi/historical/close.json";
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${bitcoinApi}?currency=${currency}`);
        const data = await response.json();
        setBitcoinData(data.bpi);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [currency]);

  const lineGraphData = {
    labels: Object.keys(bitcoinData),
    datasets: [
      {
        label: "BCI",
        data: Object.values(bitcoinData),
        backgroundColor: "#ffcccb",
      },
    ],
  };

  return (
    <div>
      <span>Select your currency:</span>
      <select value={currency} onChange={onOptionChange}>
        {currencies.map((obj, index) => (
          <option key={`${index}-${obj.country}`} value={obj.currency}>
            {obj.country}
          </option>
        ))}
      </select>

      <h1>Bitcoin Data for {currency}</h1>
      <Line data={lineGraphData} />
    </div>
  );
};

export default App;
