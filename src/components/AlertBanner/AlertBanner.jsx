import "./AlertBanner.scss";

const AlertBanner = ({ message }) => {
  return (
    <div className="alert-banner">
      <span class="material-symbols-outlined">error</span>
      <p className="body body--dark" data-testid="message">{message}</p>
    </div>
  );
};

export default AlertBanner;
