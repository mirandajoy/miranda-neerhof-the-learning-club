import "./InputField.scss";

const InputField = ({ name, type, label, placeholder, value, errorMessage, onBlur, onChange }) => {
  return (
    <div className="input">
      <label className="label input__label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        className={`body body--dark input__field ${errorMessage ? "input__field--error" : ""}`}
      />
      <span className="body input__error">{errorMessage}</span>
    </div>
  );
};

export default InputField;
