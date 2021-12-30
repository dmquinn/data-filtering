import React, { Dispatch, SetStateAction, useState } from "react";
// @ts-ignore
//no @types<package> for the slider package, this line must be ignored
import MultiRangeSlider from "multi-range-slider-react";
import "../../stylesheets/Range.css";

const Range = ({ setRangeValues }) => {
  const [minValue, setMinValue] = useState(50);
  const [maxValue, setMaxValue] = useState(200);
  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  return (
    <form
      className="col-sm-12 col-md-4 4 py-1"
      onSubmit={(e) => {
        e.preventDefault();
        setRangeValues([minValue, maxValue]);
      }}
    >
      <MultiRangeSlider
        min={50}
        max={200}
        step={1}
        ruler={false}
        // label={true}
        preventWheel={false}
        minValue={minValue}
        maxValue={maxValue}
        onChange={(e) => {
          handleInput(e);
        }}
        onMouseUp={() => setRangeValues([minValue, maxValue])}
      />
      <button type="submit" className="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default Range;