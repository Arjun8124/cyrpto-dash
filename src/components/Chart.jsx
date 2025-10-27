import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const URL = import.meta.env.VITE_API_COIN_URL;

export default function Chart({ id }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChart() {
      try {
        const res = await fetch(
          `${URL}/${id}/market_chart?vs_currency=usd&days=30`
        );
        if (!res.ok) throw new Error(`Cannot fetch data for this!`);
        const data = await res.json();

        const prices = data.prices.map((price) => {
          return { x: price[0], y: price[1] };
        });

        setChartData({
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0,123,255,0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchChart();
  }, [id]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error : {error}</p>}
      {!loading && !error && (
        <div className="chart">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false }, // Hide the legend
                tooltip: { mode: "index", intersect: false }, // Tooltip appears when hovering near a point
              },
              scales: {
                x: {
                  type: "time", // Uses date-based axis
                  time: {
                    unit: "day", // Each tick on the axis represents a day
                  },
                  ticks: {
                    autoSkip: true, // Skip ticks if there are too many
                    maxTicksLimit: 7, // Show at most 7 ticks
                  },
                },
                y: {
                  ticks: {
                    callback: (value) => `$${value.toLocaleString()}`, // Format numbers like $25,000
                  },
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
}
