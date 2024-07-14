import "./AlertBanner.scss";

const AlertBanner = ({ message }) => {
  return (
    <div className="alert-banner">
      <span class="material-symbols-outlined">error</span>
      <p className="body body--dark">{message}</p>
    </div>
  );
};

export default AlertBanner;
