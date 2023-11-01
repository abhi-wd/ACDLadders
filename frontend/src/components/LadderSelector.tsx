import { useState, useEffect } from "react";
import { LadderData } from "../utils/types";
import { cfQuesColor } from "../utils/constants";

interface LadderSelectorProps {
  setLadderData: (data: LadderData) => void;
  ladderData: LadderData;
  startRating: number;
  endRating: number;
  step: number;
  showRating: number;
  selected: number;
  setSelected: (data: number) => void;
  loaderStatus: boolean;
  setloaderStatus: (data: boolean) => void;
  start: number;
  setStart: (data: number) => void;
  end: number;
  setEnd: (data: number) => void;
}

/**
 * Every Ladder range is [X, Y), end is exclusive
 * @param props
 * @returns
 */
function LadderSelector(props: LadderSelectorProps) {
  let showRating = props.showRating || 10;
  let options: number[][] = [];
  for (let i = props.startRating; i <= props.endRating; i += props.step) {
    let st = i - props.step,
      ed = i;
    options.push([st, ed]);
  }

  const [currOptions, setCurrOptions] = useState(options);

  const nextOption = () => {
    let newEnd = Math.min(props.end + showRating, options.length);
    props.setEnd(newEnd);
    localStorage.setItem("end", newEnd.toString());
    props.setStart(newEnd - showRating);
    localStorage.setItem("start", (newEnd - showRating).toString());
    setCurrOptions(options.slice(newEnd - showRating, newEnd));
  };

  const prevOption = () => {
    let newStart = Math.max(props.start - showRating, 0);
    props.setStart(newStart);
    localStorage.setItem("start", newStart.toString());
    props.setEnd(newStart + showRating);
    localStorage.setItem("end", (newStart + showRating).toString());
    setCurrOptions(options.slice(newStart, newStart + showRating));
  };

  useEffect(() => {
    // console.log("in ladder selector", props.start, props.end);
    setCurrOptions(options.slice(props.start, props.end));
  }, [props.start, props.end]);

  let a =
    "text-white hover:bg-gray-900 font-medium rounded-lg text-sm md:text-lg px-2 py-1 md:px-5 md:py-2.5 mr-2 mb-1";

  let b =
    "bg-color-dark outline-none ring-1 ring-gray-300 font-medium rounded-lg text-sm md:text-xl px-2 py-1 md:px-5 md:py-2.5 mr-2";

  const handleSubmit = (option: number[]) => {
    console.log(option);
    props.setLadderData({
      startRating: option[0],
      endRating: option[1],
    });
    localStorage.setItem("selectedRating", option[0].toString());
    props.setSelected(option[0]);
    props.setloaderStatus(true);
  };

  return (
    <div className="flex flex-wrap mb-1">
      <button
        className="text-white hover:bg-gray-900 font-medium rounded-lg text-sm md:text-lg px-2 md:px-5 py-2.5 mr-2"
        onClick={prevOption}
      >
        Prev
      </button>

      {currOptions.map((option) => {
        return (
          <button
            className={props.selected === option[0] ? b : a}
            style={{
              color: cfQuesColor[option[0]],
            }}
            key={option[0]}
            onClick={() => handleSubmit(option)}
          >
            {" "}
            {option[0]}
          </button>
        );
      })}

      <button
        className="text-white hover:bg-gray-900 font-medium rounded-lg text-sm md:text-lg px-2 md:px-5 py-2.5 mr-2"
        onClick={nextOption}
      >
        Next
      </button>
    </div>
  );
}

export default LadderSelector;
