import "./CheckAnimation.scss";

const CheckAnimation = ({animate}) => {
  return (
    <div className="check">
      <div className={`check__icon ${animate ? "check__icon--animated" : ""}`}></div>
    </div>
  );
};

export default CheckAnimation;
