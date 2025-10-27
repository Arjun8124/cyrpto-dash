import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [filterCoins, setFilterCoins] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function fetchFromUrl() {
      try {
        const res = await fetch(
          `${API_URL}vs_currency=usd&price_change_percentage=1h&order=market_cap_desc&per_page=${perPage}&local=en&sparkline=true`
        );
        if (!res.ok) throw new Error("Failed to retrieve the data!");
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFromUrl();
  }, [perPage, filterCoins]);

  return (
    <>
      <Header />
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
      </Routes>
    </>
  );
}
