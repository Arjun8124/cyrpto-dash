export default function Sort({ sort, setSort }) {
  return (
    <div className="controls">
      <label htmlFor="sorting">Sort :</label>
      <select
        name="sorting"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Default</option>
        <option value="lhp">Price : Low to High</option>
        <option value="hlp">Price : High to Low</option>
        <option value="lhmc">Market Cap : Low to High</option>
        <option value="hlmc">Market Cap : High to Low</option>
        <option value="lh24">24 Hour Change : Low to High</option>
        <option value="hl24">24 Hour Change : High to Low</option>
      </select>
    </div>
  );
}
