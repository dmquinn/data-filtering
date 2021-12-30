import React, { useEffect, useState } from "react";
import DocType from "./components/filters/DocType";
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

  const itemsPerPage = 10;

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
    const newArray = [];
    /// check if each key[docTypeFilter] returns true
    const checkedKeys = Object.keys(docTypeFilter);
    checkedKeys.map((x, i) => {
      if (docTypeFilter[x]) {
        const output = dataArray.filter((item) => item.body.type === x);
        newArray.push(...output);
        console.log(newArray);
      }
    });
    newArray &&
      setCurrentItems(
        //slice array to show only 10 items at once
        newArray.slice(itemsPerPage * (pageIndex - 1), itemsPerPage * pageIndex)
      );
  }, [docTypeFilter]);

  return (
    <div className="App">
      <DocType
        docTypeFilter={docTypeFilter}
        setDocTypeFilter={setDocTypeFilter}
      />
      <PaginationButtons pageIndex={pageIndex} setPageIndex={setPageIndex} />
      <Table items={currentItems} />
    </div>
  );
};

export default App;
