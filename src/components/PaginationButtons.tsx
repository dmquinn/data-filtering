import { Dispatch, SetStateAction } from "react";

interface Props {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  showNextButton: boolean;
}

const PaginationButtons: React.FC<Props> = ({
  setPageIndex,
  pageIndex,
  showNextButton,
}) => {
  return (
    <div className="row j-end px-10 ">
      {pageIndex !== 1 && (
        <button
          className="button bg-blue-light text-white absolute mr-4"
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          BACK
        </button>
      )}
      {showNextButton && (
        <button
          className="button bg-red-light text-white absolute"
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default PaginationButtons;
