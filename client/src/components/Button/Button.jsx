import "./Button.scss";

const Button = ({label, type, action}) => {
  return (
    <>
      <button type={type} onClick={action}>{label}</button>
    </>
  );
};

export default Button;