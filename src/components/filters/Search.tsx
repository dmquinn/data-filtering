import { Dispatch, SetStateAction } from "react";
import { DataType } from "../../../types";

interface Props {
  setKeywordArray: Dispatch<SetStateAction<DataType[] | []>>;
  data: DataType[];
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<Props> = ({
  setKeywordArray,
  data,
  inputValue,
  setInputValue,
}) => {
  const newArray = [];
  const handleSearch = (e) => {
    setInputValue(e.target.value);

    //if length of user input value < 3, no  output:
    inputValue.length > 3
      ? //only map once every 0.3s to save computation
        setTimeout(() => {
          data.map((item, i) => {
            (item.body.bankName
              .toUpperCase()
              .includes(inputValue.toUpperCase()) &&
              newArray.push(item)) ||
              (item.body.bankBIC[0]
                .toUpperCase()
                .includes(inputValue.toUpperCase()) &&
                newArray.push(item));
          });

          setKeywordArray(newArray);
        }, 300)
      : //no user input or deleted user input resets the keywordArray.
        setKeywordArray([]);
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
