import { useEffect, useState } from "react";
import Buttons from "./components/Buttons";
import Filters from "./components/filters/DocType";
import Search from "./components/filters/Search";
import Published from "./components/filters/Published";
import Table from "./components/Table";
import Range from "./components/filters/Range";

function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const [keywordArray, setKeywordArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [rangeValues, setRangeValues] = useState([50, 200]);
  const [isPublished, setIsPublished] = useState({ yes: true, no: true });
  const [dataArray, setDataArray] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [docTypeFilter, setDocTypeFilter] = useState({
    primary: true,
    extended: true,
    intermediate: true,
  });
  const itemsPerPage = 10;

  ///ensures both date formats are the same for comparison
  const now = new Date().toISOString().split("T")[0];
  const dateFixer = (a) => {
    const date = a.split("D").pop().split("T").shift();
    return date;
  };
  //mock API call from ./public
  const dataFetch = async () => {
    try {
      const res = await fetch("./reports.json");
      const data = res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataFetch()
      .then((data) => {
        setDataArray(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let test = dataArray;

    const checker = (docTypeFilter) => {
      const newArray = [];
      /// check if each key[docTypeFilter] returns true
      const checkedKeys = Object.keys(docTypeFilter);
      checkedKeys.map((x, i) => {
        if (docTypeFilter[x]) {
          const output = dataArray.filter((item) => item.body.type === x);
          newArray.push(...output);
        }
      });
      const filterByRange = newArray.filter(
        (item) =>
          item.body.reportScore >= rangeValues[0] &&
          item.body.reportScore <= rangeValues[1]
      );

      ///published/unpublished filters
      const publishFiltering = [];

      if (isPublished.yes) {
        const d = filterByRange.filter(
          (item) => dateFixer(item.publishedAt) < now
        );
        publishFiltering.push(...d);
      }
      if (isPublished.no) {
        const e = filterByRange.filter(
          (item) => dateFixer(item.publishedAt) > now
        );
        publishFiltering.push(...e);
      }
      return publishFiltering;
    };
    const filtered = checker(docTypeFilter);
    filtered.length && (test = filtered);
    setCurrentItems(
      //slice array to show only 10 items at once
      test.slice(itemsPerPage * (pageIndex - 1), itemsPerPage * pageIndex)
    );
    keywordArray.length && setCurrentItems(keywordArray);
  }, [
    pageIndex,
    keywordArray,
    docTypeFilter,
    isPublished,
    rangeValues,
    dataArray,
  ]);

  return (
    <div className="p-4">
      <div className="row j-center">
        <h2>Elucidate Coding Challenge</h2>
        <Search
          keywordArray={keywordArray}
          data={dataArray}
          setKeywordArray={setKeywordArray}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
      <div className="row j-between px-10 separater">
        <Published isPublished={isPublished} setIsPublished={setIsPublished} />
        <Range rangeValues={rangeValues} setRangeValues={setRangeValues} />
        <Filters
          docTypeFilter={docTypeFilter}
          setDocTypeFilter={setDocTypeFilter}
          setKeywordArray={setKeywordArray}
          setInputValue={setInputValue}
        />{" "}
      </div>
      <div className="row j-end pr-10">
        <Buttons pageIndex={pageIndex} setPageIndex={setPageIndex} />
      </div>
      {currentItems.length && <Table items={currentItems} />}
    </div>
  );
}

export default App;
