import React, { useEffect, useState } from "react";
import DocType from "./components/filters/DocType";
import Published from "./components/filters/Published";
import PaginationButtons from "./components/PaginationButtons";
import Table from "./components/Table";

const App = () => {
  const [dataArray, setDataArray] = useState([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [docTypeFilter, setDocTypeFilter] = useState({
    primary: true,
    extended: true,
    intermediate: true,
  });
  const [isPublished, setIsPublished] = useState({
    yes: true,
    no: true,
  });
  const itemsPerPage = 10;

  ///ensures both date formats are the same for comparison
  const now = new Date().toISOString().split("T")[0];
  const dateFixer = (a) => {
    const date = a.split("D").pop().split("T").shift();
    return date;
  };

  //mock API call
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
    dataArray && console.log(dataArray);

    const newArray = [];
    /// check if each key[docTypeFilter] returns true
    const checkedKeys = Object.keys(docTypeFilter);
    checkedKeys.map((x, i) => {
      if (docTypeFilter[x]) {
        const output = dataArray.filter((item) => item.body.type === x);
        newArray.push(...output);
      }
    });
    const publishFiltering = [];

    if (isPublished.yes) {
      const d = newArray.filter((item) => dateFixer(item.publishedAt) < now);
      publishFiltering.push(...d);
    }
    if (isPublished.no) {
      const e = newArray.filter((item) => dateFixer(item.publishedAt) > now);
      publishFiltering.push(...e);
    }
    publishFiltering &&
      setCurrentItems(
        //slice array to show only 10 items at once
        publishFiltering.slice(
          itemsPerPage * (pageIndex - 1),
          itemsPerPage * pageIndex
        )
      );
  }, [docTypeFilter, isPublished]);

  return (
    <div className="App">
      <DocType
        docTypeFilter={docTypeFilter}
        setDocTypeFilter={setDocTypeFilter}
      />
      <Published isPublished={isPublished} setIsPublished={setIsPublished} />
      <PaginationButtons pageIndex={pageIndex} setPageIndex={setPageIndex} />
      <Table items={currentItems} />
    </div>
  );
};

export default App;
