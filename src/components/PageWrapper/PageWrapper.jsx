import { Link, useNavigate } from "react-router-dom";
import "./PageWrapper.scss";
import Button from "../Button/Button";

const PageWrapper = ({ preHeader, header, width, children, back }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className={`page-wrapper page-wrapper--${width}`}>
      <div className="page-wrapper__inner-wrapper">
        {back && (
          <button onClick={handleBackClick} className="page-wrapper__back-container">
            <span className="material-symbols-outlined page-wrapper__back-icon">arrow_back</span>
            <span className="page-wrapper__back-text">Back</span>
          </button>
        )}
        {header && (
          <div className="page-wrapper__header-container">
            {preHeader && <h3 className="header header--tertiary">{preHeader}</h3>}
            <h1 className="header header--primary page-wrapper__header">{header}</h1>
          </div>
        )}
        {children}
      </div>
    </main>
  );
};

export default PageWrapper;
