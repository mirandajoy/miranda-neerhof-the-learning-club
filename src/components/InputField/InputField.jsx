import "./InputField.scss";

const InputField = ({ name, type, label, placeholder, value, errorMessage, onBlur, onChange }) => {
  console.log(name, value)
  return (
    <div className="input">
      <label className="label input__label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        className={`body body--dark input__field ${errorMessage ? "input__field--error" : ""}`}
        autoComplete="off"
      />
      <span className="body input__error">{errorMessage}</span>
    </div>
  );
};

export default InputField;
