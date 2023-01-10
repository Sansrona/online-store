import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import classnames from "classnames";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: Function;
  currentStockValues: number[];
}

const StockFilter: FC<MultiRangeSliderProps> = ({
                                                  min,
                                                  max,
                                                  onChange,
                                                  currentStockValues,
                                                }) => {
  const [minVal, setMinVal] = useState(currentStockValues[0]);
  const [maxVal, setMaxVal] = useState(currentStockValues[1]);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className="p-2">
      <p className="uppercase font-medium">Stock</p>
      <div className="pt-2 flex justify-start">
        <input
          type="range"
          min={min}
          max={max}
          value={currentStockValues[0]}
          ref={minValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = +event.target.value;
            setMinVal(value);
            onChange({min: minVal, max: maxVal});
          }}
          className={`${classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })} flex-1`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={currentStockValues[1]}
          ref={maxValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = +event.target.value;
            setMaxVal(value);
            onChange({min: minVal, max: maxVal});
          }}
          className="thumb thumb--zindex-4 flex-1"
        />
      </div>

      <div className="slider">
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
        <div className="flex justify-between">
          <div className="slider__left-value">
            {currentStockValues[0] !== Number.POSITIVE_INFINITY ? (
              currentStockValues[0]
            ) : (
              <p>No products</p>
            )}
          </div>
          <div className="slider__right-value">
            {currentStockValues[0] !== Number.POSITIVE_INFINITY ? (
              currentStockValues[1]
            ) : (
              <p>No products</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockFilter;
