import "./InputRadio.scss";

const InputRadio = ({ label, name, values, onChange, checkedValue }) => {
  return (
    <fieldset className="radio-input">
      <legend className="label radio-input__label">{label}</legend>
      <div className="radio-input__options-container">
        {values.map((item, index) => {
          return (
            <div key={index} className="radio-input__option-container">
              <input
                type="radio"
                id={name}
                name={name}
                checked={checkedValue == item.id}
                value={item.id}
                onChange={onChange}
                className="radio-input__option-input"
              />
              <label htmlFor={name} className="body body--dark radio-input__option-label">
                {item.name}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export default InputRadio;
