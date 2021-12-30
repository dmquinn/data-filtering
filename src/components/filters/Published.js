import React from "react";

const Published = ({ isPublished, setIsPublished }) => {
  return (
    <div className="col-sm-12 col-md-4">
      <label className="control control-checkbox">
        Publised{" "}
        <input
          type="checkbox"
          id="yes"
          checked={isPublished.yes}
          onChange={() =>
            setIsPublished({ ...isPublished, yes: !isPublished.yes })
          }
        />
        <div className="control_indicator"></div>
      </label>
      <label className="control control-checkbox">
        Unpublised{" "}
        <input
          type="checkbox"
          id="no"
          checked={isPublished.no}
          onChange={() =>
            setIsPublished({ ...isPublished, no: !isPublished.no })
          }
        />
        <div className="control_indicator"></div>
      </label>
    </div>
  );
};

export default Published;
