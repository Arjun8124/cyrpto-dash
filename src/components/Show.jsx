export default function Show({ perPage, setLoading, setPerPage }) {
  return (
    <div className="controls">
      <label htmlFor="show">Show :</label>
      <select
        name="show"
        value={perPage}
        onChange={(e) => {
          setPerPage(e.target.value);
          setLoading(true);
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
