import React from "react";

function PriceRange({ selectedPriceRange, setSelectedPriceRange }) {
  return (
    <div>
      <label className="py-2">
        <strong>Price</strong>
      </label>

      <div
        className="d-flex justify-content-between px-1 mb-1 text-muted"
        style={{ fontSize: "0.8rem" }}
      >
        <span>500</span>
        <span>5000</span>
        <span>10000</span>
      </div>

      <input
        type="range"
        className="form-range"
        min="500"
        max="10000"
        step="1"
        value={selectedPriceRange}
        onChange={(event) => setSelectedPriceRange(Number(event.target.value))}
      />
    </div>
  );
}

export default PriceRange;
