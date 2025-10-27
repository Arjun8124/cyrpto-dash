import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Details from "../components/Details";
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
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [param]);

  return <Details loading={loading} error={error} details={details} />;
}
