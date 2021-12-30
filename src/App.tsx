import React, { useEffect, useState } from "react";
import PaginationButtons from "./components/PaginationButtons";
import Table from "./components/Table";

const App = () => {
  const [dataArray, setDataArray] = useState([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState([]);

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
        console.log(dataArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dataArray &&
      setCurrentItems(
        //slice array to show only 10 items at once
        dataArray.slice(
          itemsPerPage * (pageIndex - 1),
          itemsPerPage * pageIndex
        )
      );
  });

  return (
    <div className="App">
      <PaginationButtons pageIndex={pageIndex} setPageIndex={setPageIndex} />
      <Table items={currentItems} />
    </div>
  );
};

export default App;
