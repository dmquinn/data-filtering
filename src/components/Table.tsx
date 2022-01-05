import { ReportObjectType } from "../../types";
import "../stylesheets/Table.css";

interface Props {
  items: ReportObjectType[] | [];
}

const Table: React.FC<Props> = ({ items }) => {
  const timeFormat = (date) => {
    const formattedDate = date.split("T").shift();
    return formattedDate;
  };

  const dateFormat = (date) => {
    const formattedDate = date.split("T").pop().split(".").shift();
    return formattedDate;
  };
  return (
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
        {items.map((item, i) => {
          const bankDetails = item.body;
          return (
            <tr key={i}>
              <td>{bankDetails.bankName}</td>
              <td>{bankDetails.bankBIC[0]}</td>
              <td>{bankDetails.reportScore.toFixed(3)}</td>
              <td>{bankDetails.type}</td>
              <td>
                <span>{timeFormat(item.createdAt)}</span>
                <span className="text-grey-dark">
                  {" "}
                  {dateFormat(item.createdAt)}
                </span>
              </td>
              <td>
                <span> {timeFormat(item.publishedAt)}</span>
                <span className="text-grey-dark">
                  {" "}
                  {dateFormat(item.publishedAt)}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
