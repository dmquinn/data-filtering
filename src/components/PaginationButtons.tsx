import { Dispatch, SetStateAction } from "react";

interface Props {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
}

const PaginationButtons: React.FC<Props> = ({ setPageIndex, pageIndex }) => {
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
