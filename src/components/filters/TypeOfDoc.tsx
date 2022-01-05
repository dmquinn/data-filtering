import { Dispatch, SetStateAction, useEffect } from "react";
import { ReportObjectType, DocType } from "../../../types";
import "../../stylesheets/Checkbox.css";

interface Props {
  docTypeFilter: DocType;
  setDocTypeFilter: Dispatch<SetStateAction<DocType>>;
  setSearchResultsArray: Dispatch<SetStateAction<ReportObjectType[] | []>>;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const TypeOfDoc: React.FC<Props> = ({
  docTypeFilter,
  setDocTypeFilter,
  setSearchResultsArray,
  setInputValue,
}) => {
  useEffect(() => {
    setInputValue("");
    setSearchResultsArray([]);
  }, [docTypeFilter, setInputValue, setSearchResultsArray]);
  return (
    <div className="col-sm-12 col-md-4 py-1">
      <div>
        <label className="control control-checkbox">
          Primary{" "}
          <input
            type="checkbox"
            id="primary"
            checked={docTypeFilter.primary}
            onChange={() =>
              setDocTypeFilter({
                ...docTypeFilter,
                primary: !docTypeFilter.primary,
              })
            }
          />{" "}
          <div className="control_indicator"></div>
        </label>
        <label className="control control-checkbox">
          Extended{" "}
          <input
            type="checkbox"
            id="extended"
            checked={docTypeFilter.extended}
            onChange={() =>
              setDocTypeFilter({
                ...docTypeFilter,
                extended: !docTypeFilter.extended,
              })
            }
          />{" "}
          <div className="control_indicator"></div>
        </label>
        <label className="control control-checkbox">
          Intermediate{" "}
          <input
            type="checkbox"
            id="intermediate"
            checked={docTypeFilter.intermediate}
            onChange={() =>
              setDocTypeFilter({
                ...docTypeFilter,
                intermediate: !docTypeFilter.intermediate,
              })
            }
          />{" "}
          <div className="control_indicator"></div>
        </label>
      </div>
    </div>
  );
};
export default TypeOfDoc;
