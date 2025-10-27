import { Link } from "react-router";
import Chart from "./Chart";
export default function Details({ loading, error, details }) {
  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
      {error && <p>Error : {error}</p>}
      {!loading && !error && (
        <div className={loading ? "blur-background" : ""}>
          <div className="details">
            <Link to={"/"}>← Go back to Home</Link>
            <img src={details.image.large} alt={details.name} />
            <h1 className="self-center">{details.name}</h1>
            <p className="mt-5">{details.description.en}</p>
            <h3>
              Market Cap : $
              {details.market_data.market_cap.usd.toLocaleString()}
            </h3>
            <h3>Market Cap Rank : {details.market_cap_rank}</h3>
            <h3>
              Current Price : $
              {details.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h3
              className={
                details.market_data.price_change_percentage_24h.toFixed(3) > 0
                  ? "positive"
                  : "negative"
              }
            >
              Market Cap Change Percentage in 24h :{" "}
              {details.market_data.price_change_percentage_24h.toFixed(3)}%{" "}
            </h3>
            <Chart id={details.id} />
            <a href={details.links.homepage}>HomePage Link</a>
            <h4>Categories: </h4>
            <ul className="categories">
              {details.categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
