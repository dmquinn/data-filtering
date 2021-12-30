import React from "react";

import "../stylesheets/Table.css";

const Table = ({ items }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>BIC</th>
            <th>Report Score</th>
            <th>Type</th>
            <th>Created</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {!!items &&
            items.map((item, i) => {
              const bankDetails = item.body;
              return (
                <tr key={i}>
                  <td>{bankDetails.bankName}</td>
                  <td>{bankDetails.bankBIC[0]}</td>
                  <td>{bankDetails.reportScore.toFixed(3)}</td>
                  <td>{bankDetails.type}</td>
                  <td>
                    <span> {item.createdAt.split("T").shift()}</span>
                    <span className="text-grey-dark">
                      {" "}
                      {item.createdAt.split("T").pop().split(".").shift()}
                    </span>
                  </td>
                  <td>
                    <span> {item.publishedAt.split("T").shift()}</span>
                    <span className="text-grey-dark">
                      {" "}
                      {item.publishedAt.split("T").pop().split(".").shift()}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
