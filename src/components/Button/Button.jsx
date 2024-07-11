import "./Button.scss";

const Button = ({label, type, styleType, action}) => {
  return (
      <button type={type} onClick={action} className={`button button--${styleType}`}>{label}</button>
  );
};

export default Button;