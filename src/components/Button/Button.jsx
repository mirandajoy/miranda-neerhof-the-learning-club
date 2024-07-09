import "./Button.scss";

const Button = ({label, type, action}) => {
  return (
    <>
      <button type={type} onClick={action} className="button">{label}</button>
    </>
  );
};

export default Button;