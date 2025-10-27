import CoinCard from "../components/CoinCard";
import Show from "../components/Show";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

export default function HomePage({
  coins,
  filterCoins,
  setFilterCoins,
  sort,
  setSort,
  loading,
  setLoading,
  perPage,
  setPerPage,
  error,
}) {
  const filteredArray = coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(filterCoins.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case "lhp":
          return a.current_price - b.current_price;
        case "hlp":
          return b.current_price - a.current_price;
        case "lhmc":
          return a.market_cap - b.market_cap;
        case "hlmc":
          return b.market_cap - a.market_cap;
        case "lh24":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "hl24":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  return (
    <div>
      <h1>🚀Crypto Dash</h1>
      <div className="top-controls">
        <Show
          perPage={perPage}
          setLoading={setLoading}
          setPerPage={setPerPage}
        />
        <Filter filterCoins={filterCoins} setFilterCoins={setFilterCoins} />
        <Sort sort={sort} setSort={setSort} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error}</p>}
      {!loading && !error && (
        <main className="grid">
          {filteredArray.length > 0 ? (
            filteredArray.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No Matches Found!!</p>
          )}
        </main>
      )}
    </div>
  );
}
