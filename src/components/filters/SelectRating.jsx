import { useState } from "react";

const SelectRating = ({ selectedRating, setSelectedRating }) => {
  return (
    <div>
      <label className="py-2">
        <strong>Rating</strong>
      </label>

      <div>
        <div className="form-check">
          <label className="form-check-label" htmlFor="4starAndAbove">
            <input
              className="form-check-input"
              type="radio"
              id="4starAndAbove"
              name="rating"
              value="4"
              checked={Number(selectedRating) === 4}
              onChange={(event) => setSelectedRating(event.target.value)}
            />
            4 Stars & above
          </label>
        </div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="3starAndAbove">
            <input
              className="form-check-input"
              type="radio"
              id="3starAndAbove"
              name="rating"
              value="3"
              checked={Number(selectedRating) === 3}
              onChange={(event) => setSelectedRating(event.target.value)}
            />
            3 Stars & above
          </label>
        </div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="2starAndAbove">
            <input
              className="form-check-input"
              type="radio"
              id="2starAndAbove"
              name="rating"
              value="2"
              checked={Number(selectedRating) === 2}
              onChange={(event) => setSelectedRating(event.target.value)}
            />
            2 Stars & above
          </label>
        </div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="1starAndAbove">
            <input
              className="form-check-input"
              type="radio"
              id="1starAndAbove"
              name="rating"
              value="1"
              checked={Number(selectedRating) === 1}
              onChange={(event) => setSelectedRating(event.target.value)}
            />
            1 Stars & above
          </label>
        </div>
      </div>
    </div>
  );
};
export default SelectRating;
