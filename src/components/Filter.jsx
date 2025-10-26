export default function Filter({ filterCoins, setFilterCoins }) {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search for..."
        value={filterCoins}
        onChange={(e) => setFilterCoins(e.target.value)}
      />
    </div>
  );
}
