import "./Button.scss";

const Button = ({label, type, styleType, size, action}) => {
  return (
      <button type={type} onClick={action} className={`button button--${styleType} button--${size}`} data-testid="button">{label}</button>
  );
};

export default Button;
