import React, { Dispatch, SetStateAction, useState } from "react";
//multi-range-slider-react has no @types<package> and must be ignored
//@ts-ignore
import MultiRangeSlider from "multi-range-slider-react";
import "../../stylesheets/Range.css";

interface Props {
  setRangeValues: Dispatch<SetStateAction<number[]>>;
}

const Range: React.FC<Props> = ({ setRangeValues, rangeValues }) => {
  const handleInput = (e) => {
    setRangeValues([e.minValue, e.maxValue]);
  };

  return (
    <div className="col-sm-12 mt-1">
      <p>Report Scores</p>
      <p className="text-4">Please provide minimum and maximum values</p>
      <MultiRangeSlider
        //min changed from 50 to 0
        min={0}
        max={200}
        step={1}
        ruler={false}
        preventWheel={false}
        minValue={25}
        maxValue={150}
        onChange={(e) => {
          handleInput(e);
        }}
      />
    </div>
  );
};

export default Range;
