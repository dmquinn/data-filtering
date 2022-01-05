import { Dispatch, SetStateAction } from "react";
import { ReportObjectType } from "../../../types";
import { getSearchResults } from "../../utils/functions";

interface Props {
  setSearchResultsArray: Dispatch<SetStateAction<ReportObjectType[] | []>>;
  data: ReportObjectType[];
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<Props> = ({
  setSearchResultsArray,
  data,
  inputValue,
  setInputValue,
}) => {
  const handleSearch = (e) => {
    if (e.target.value.length) {
      setInputValue(e.target.value);
      const filteredSearchResults = getSearchResults(data, e.target.value);
      setSearchResultsArray(filteredSearchResults);
    } else {
      setInputValue("");
      setSearchResultsArray([]);
    }
  };

  return (
    <div className="col-sm-12 col-md-6 text-end">
      <input
        placeholder="Search"
        type="text"
        value={inputValue}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Search;
