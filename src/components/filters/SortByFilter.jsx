import { useState } from "react";

const SortByFilter = ({ selectedSortBy, setSelectedSortBy }) => {
  return (
    <div className="py-2">
      <label className="py-2">
        <strong>Sort by</strong>
      </label>

      <div>
        <div className="form-check">
          <label className="form-check-label" htmlFor="lowToHigh">
            <input
              className="form-check-input"
              type="radio"
              id="lowToHigh"
              name="sortBy"
              value="lowToHigh"
              checked={selectedSortBy === "lowToHigh"}
              onChange={(event) => setSelectedSortBy(event.target.value)}
            />
            Price - Low to High
          </label>
        </div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="highToLow">
            <input
              className="form-check-input"
              type="radio"
              id="highToLow"
              name="sortBy"
              value="highToLow"
              checked={selectedSortBy === "highToLow"}
              onChange={(event) => setSelectedSortBy(event.target.value)}
            />
            Price - High to Low
          </label>
        </div>
      </div>
    </div>
  );
};
export default SortByFilter;
