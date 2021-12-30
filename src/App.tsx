import React, { useEffect, useState } from "react";
import Table from "./components/Table";

const App = () => {
  const [dataArray, setDataArray] = useState([]);

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

  return (
    <div className="App">
      <Table items={dataArray} />
    </div>
  );
};

export default App;
