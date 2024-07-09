import "./InputField.scss";

const InputField = ({ name, type, label, placeholder, value, errorMessage, onBlur, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        className={`input__field ${errorMessage ? "input__field--error" : ""}`}
      />
      <span>{errorMessage}</span>
    </>
  );
};

export default InputField;
