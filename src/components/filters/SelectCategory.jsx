const SelectCategory = (props) => {
  const { selectedCategory, handleCategorySelection } = props;
  return (
    <div>
      <label className="py-2">
        <strong>Category</strong>
      </label>

      <div>
        <div className="form-check">
          <label className="form-check-label" htmlFor="casualWear">
            <input
              className="form-check-input"
              type="checkbox"
              id="casualWear"
              value="Casual Wear"
              checked={selectedCategory.includes("Casual Wear")}
              onChange={(event) => handleCategorySelection(event)}
            />
            Casual Wear
          </label>
        </div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="formalWear">
            <input
              className="form-check-input"
              type="checkbox"
              id="formalWear"
              value="Formal Wear"
              checked={selectedCategory.includes("Formal Wear")}
              onChange={(event) => handleCategorySelection(event)}
            />
            Formal Wear
          </label>
        </div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="sportsWear">
            <input
              className="form-check-input"
              type="checkbox"
              id="sportsWear"
              value="Sports Wear"
              checked={selectedCategory.includes("Sports Wear")}
              onChange={(event) => handleCategorySelection(event)}
            />
            Sports Wear
          </label>
        </div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="innerWear">
            <input
              className="form-check-input"
              type="checkbox"
              id="innerWear"
              value="Inner Wear"
              checked={selectedCategory.includes("Inner Wear")}
              onChange={(event) => handleCategorySelection(event)}
            />
            Inner Wear
          </label>
        </div>
      </div>
    </div>
  );
};
export default SelectCategory;
