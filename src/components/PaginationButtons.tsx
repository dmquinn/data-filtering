import React from "react";

const PaginationButtons = ({ pageIndex, setPageIndex }) => {
  return (
    <>
      {pageIndex !== 1 && (
        <button
          className="button bg-blue-light text-white mr-1"
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          BACK
        </button>
      )}

      <button
        className="button bg-red-light text-white"
        onClick={() => setPageIndex(pageIndex + 1)}
      >
        NEXT
      </button>
    </>
  );
};

export default PaginationButtons;
