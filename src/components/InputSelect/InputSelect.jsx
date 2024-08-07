import "./InputSelect.scss";

const InputSelect = ({ name, label, values, errorMessage, onChange, placeholder, selectedValue }) => {
  return (
    <div className="input-select">
      <label className="label input-select__label" htmlFor={name}>
        {label}
      </label>
      <div className="input-select__field-container">
        <select
          id={name}
          name={name}
          value={selectedValue}
          onChange={onChange}
          className="body body--dark input-select__field"
        >
          <option value="">{!selectedValue ? placeholder : selectedValue}</option>
          {values && values.map((item) => {
            return (
              <option key={item.id} value={item.id} className="body body--dark input-select__option">
                {item.name}
              </option>
            );
          })}
        </select>
        <div className="input-select__arrow">
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
      </div>
      <span className="body input-select__error">{errorMessage}</span>
    </div>
  );
};

export default InputSelect;
