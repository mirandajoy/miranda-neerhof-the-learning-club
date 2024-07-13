import "./CheckAnimation.scss";

const CheckAnimation = ({ animate, label, check, icon }) => {
  return (
    <div className="success-check">
      {check && (
        <div className="check">
          <div className={`check__icon ${animate ? "check__icon--animated" : ""}`}></div>
        </div>
      )}
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      <span className="body body--dark success-check__text">{label}</span>
    </div>
  );
};

export default CheckAnimation;
