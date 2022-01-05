import { useEffect, useState } from "react";
import Buttons from "./components/PaginationButtons";
import TypeOfDoc from "./components/filters/TypeOfDoc";
import Search from "./components/filters/Search";
import Published from "./components/filters/Published";
import Table from "./components/Table";
import Range from "./components/filters/Range";
import { filterFunction } from "./utils/functions";
import { ReportObjectType, PublishedType, DocType } from "../types";

const App: React.FC = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchResultsArray, setSearchResultsArray] = useState<
    ReportObjectType[] | []
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [rangeValues, setRangeValues] = useState<number[]>([50, 200]);
  const [isPublished, setIsPublished] = useState<PublishedType>({
    yes: true,
    no: true,
  });
  const [dataArray, setDataArray] = useState<[] | ReportObjectType[]>([]);
  const [currentItems, setCurrentItems] = useState<[] | ReportObjectType[]>([]);
  const [docTypeFilter, setDocTypeFilter] = useState<DocType>({
    primary: true,
    extended: true,
    intermediate: true,
  });
  const [showNextButton, setShowNextButton] = useState<boolean>(true);
  const itemsPerPage = 10;

  //mock API call from ./public
  async function fetchData() {
    const res = await fetch("./reports.json");
    res
      .json()
      .then((res) => setDataArray(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filterFunction(
      searchResultsArray.length ? searchResultsArray : dataArray,
      docTypeFilter,
      rangeValues,
      isPublished
    );
    //slice array to show only 10 items at once

    setCurrentItems(
      filtered.slice(itemsPerPage * (pageIndex - 1), itemsPerPage * pageIndex)
    );
    if (filtered.length <= itemsPerPage * pageIndex) {
      setShowNextButton(false);
    } else {
      setShowNextButton(true);
    }
  }, [
    pageIndex,
    searchResultsArray,
    docTypeFilter,
    isPublished,
    rangeValues,
    dataArray,
  ]);

  return (
    <div className="p-4">
      <div className="row w-100 p-lg-10">
        <h2 className="mb-1">Elucidate Coding Challenge</h2>

        <Search
          data={dataArray}
          setSearchResultsArray={setSearchResultsArray}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
      <h5 className="px-10 mb-1">Filters</h5>

      <div className="row j-center mb-1"></div>
      <div className="row j-between px-10 separator">
        <Published isPublished={isPublished} setIsPublished={setIsPublished} />
        <Range rangeValues={rangeValues} setRangeValues={setRangeValues} />
        <TypeOfDoc
          docTypeFilter={docTypeFilter}
          setDocTypeFilter={setDocTypeFilter}
          setSearchResultsArray={setSearchResultsArray}
          setInputValue={setInputValue}
        />{" "}
      </div>
      {/* <div className="row j-end w-80"> */}
      <Buttons
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        showNextButton={showNextButton}
        // setShowNextButton={showNextButton}
      />
      {/* </div> */}
      {currentItems.length && <Table items={currentItems} />}
    </div>
  );
};

export default App;
