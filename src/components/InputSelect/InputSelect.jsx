import "./InputSelect.scss";

const InputSelect = ({ name, label, values, errorMessage, onChange, placeholder, selectedValue }) => {
  return (
    <div className="input-select">
      <label className="label input-select__label" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} value={selectedValue} onChange={onChange} className="body body--dark input-select__field">
        <option value="">{!selectedValue ? placeholder : selectedValue}</option>
        {values.map((item, index) => {
          return (
            <option key={index} value={item} className="body body--dark">
              {item}
            </option>
          );
        })}
      </select>
      <span className="body input-select__error">{errorMessage}</span>
    </div>
  );
};

export default InputSelect;
