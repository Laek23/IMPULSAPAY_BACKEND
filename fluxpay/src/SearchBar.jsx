import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

const SearchBar = ({ data = [], onResults }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery) {
      onResults(data);
      return;
    }

    const q = debouncedQuery.toLowerCase();

    const filtered = data.filter(row =>
      row.some(cell =>
        String(cell).toLowerCase().includes(q)
      )
    );

    onResults(filtered);
  }, [debouncedQuery, data, onResults]);

  return (
    <input
      type="text"
      placeholder="Buscar..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="form-control mb-3"
      style={{ maxWidth: 320, borderRadius: 12 }}
    />
  );
};

export default SearchBar;