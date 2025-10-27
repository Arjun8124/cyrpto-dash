import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [filterCoins, setFilterCoins] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function fetchFromUrl() {
      try {
        const res = await fetch(
          `${API_URL}vs_currency=usd&price_change_percentage=1h&order=market_cap_desc&per_page=${perPage}&local=en&sparkline=true`
        );
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFromUrl();
  }, [perPage, filterCoins]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            coins={coins}
            filterCoins={filterCoins}
            setFilterCoins={setFilterCoins}
            sort={sort}
            setSort={setSort}
            loading={loading}
            setLoading={setLoading}
            perPage={perPage}
            setPerPage={setPerPage}
            error={error}
          />
        }
      />
    </Routes>
  );
}
