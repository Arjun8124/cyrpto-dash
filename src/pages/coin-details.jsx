import { useEffect, useState } from "react";
import { useParams } from "react-router";
const API_URL = import.meta.env.VITE_API_COIN_URL;

export default function CoinDetailsPage() {
  const param = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/${param.id}`);
        if (!res.ok)
          throw new Error(
            `Failed to fetch the details for the coin ${param.id}`
          );
        const data = await res.json();
        console.log(data);
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [param]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error}</p>}
      {!loading && !error && (
        <div className="details">
          <img src={details.image.large} alt={details.name} />
          <h1 className="self-center">{details.name}</h1>
          <p className="mt-5">{details.description.en}</p>
          <h2>
            Market Cap : ${details.market_data.market_cap.usd.toLocaleString()}
          </h2>
          <h2>Market Cap Rank : {details.market_cap_rank}</h2>
          <h2>
            Current Price : $
            {details.market_data.current_price.usd.toLocaleString()}
          </h2>
          <h2
            className={
              details.market_data.price_change_percentage_24h.toFixed(3) > 0
                ? "positive"
                : "negative"
            }
          >
            Market Cap Change Percentage in 24h :{" "}
            {details.market_data.price_change_percentage_24h.toFixed(3)}%{" "}
          </h2>
          <a href={details.links.homepage}>HomePage Link</a>
          <h3>Categories: </h3>
          <ul className="categories">
            {details.categories.map((category) => (
              <li>{category}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
