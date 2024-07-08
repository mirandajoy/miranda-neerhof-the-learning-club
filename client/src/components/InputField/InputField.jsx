import "./InputField.scss";

const InputField = ({type, placeholder, name}) => {
  return (
    <>
      <input id={name} name={name} type={type} placeholder={placeholder} />
    </>
  );
};

export default InputField;