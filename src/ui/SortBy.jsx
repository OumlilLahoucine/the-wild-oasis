import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!options.length) return null;
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  const currentSort = searchParams.get("sortBy") || "";

  return (
    <Select
      options={options}
      value={currentSort}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
