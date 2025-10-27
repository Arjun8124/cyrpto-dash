import { Link } from "react-router";

export default function CoinCard({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="coin-card" key={coin.id}>
        <header className="coin-header">
          <img src={coin.image} alt={coin.name} className="coin-image" />
          <div>
            <h2>{coin.name}</h2>
            <p className="symbol">{coin.symbol}</p>
          </div>
        </header>
        <p>Price : ${coin.current_price.toLocaleString()}</p>
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
          }
        >
          24h change : {coin.price_change_percentage_24h >= 0 ? "↑" : "↓"}{" "}
          {coin.price_change_percentage_24h.toFixed(3)}%
        </p>
        <p>Market Cap : ${coin.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  );
}
