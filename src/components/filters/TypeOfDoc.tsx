import { Dispatch, SetStateAction, useEffect } from "react";
import { DataType, DocType } from "../../../types";
import "../../stylesheets/Checkbox.css";

interface Props {
  docTypeFilter: DocType;
  setDocTypeFilter: Dispatch<SetStateAction<DocType>>;
  setKeywordArray: Dispatch<SetStateAction<DataType[] | []>>;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const TypeOfDoc: React.FC<Props> = ({
  docTypeFilter,
  setDocTypeFilter,
  setKeywordArray,
  setInputValue,
}) => {
  useEffect(() => {
    setInputValue("");
    setKeywordArray([]);
  }, [docTypeFilter]);
  return (
    <div className="col-sm-12 col-md-4 py-1">
      <div>
        <label className="control control-checkbox">
          Primary
          <input
            type="checkbox"
            id="primary"
            //defaultValue={docTypeFilter.primary}
            checked={docTypeFilter.primary}
            onChange={() =>
              setDocTypeFilter({
                ...docTypeFilter,
                primary: !docTypeFilter.primary,
              })
            }
          />
          <div className="control_indicator"></div>
        </label>
        <label className="control control-checkbox">
          Extended
          <input
            type="checkbox"
            id="extended"
            //defaultValue={docTypeFilter.extended}
            checked={docTypeFilter.extended}
            onChange={() =>
              setDocTypeFilter({
                ...docTypeFilter,
                extended: !docTypeFilter.extended,
              })
            }
          />
          <div className="control_indicator"></div>
        </label>
        <label className="control control-checkbox">
          Intermediate
          <input
            type="checkbox"
            id="intermediate"
            //defaultValue={docTypeFilter.intermediate}
            checked={docTypeFilter.intermediate}
            onChange={() =>
              setDocTypeFilter({
                ...docTypeFilter,
                intermediate: !docTypeFilter.intermediate,
              })
            }
          />
          <div className="control_indicator"></div>
        </label>
      </div>
    </div>
  );
};
export default TypeOfDoc;