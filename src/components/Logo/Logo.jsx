import "./Logo.scss";

const Logo = ({ animate }) => {
  return (
    <div className="logo">
      <div className="logo__square"></div>
      <div className="logo__circle"></div>
      <div className="logo__triangle"></div>
    </div>
  );
};

export default Logo;
