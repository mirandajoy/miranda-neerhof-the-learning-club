import "./PageWrapper.scss";
import { Link } from "react-router-dom";

const PageWrapper = ({ preHeader, header, width, children, back }) => {
  return (
    <main className={`page-wrapper page-wrapper--${width}`}>
      <div className="page-wrapper__inner-wrapper">
        {back && (
          <Link to={back} className="page-wrapper__back-container">
            <span className="material-symbols-outlined page-wrapper__back-icon">arrow_back</span>
            <span className="page-wrapper__back-text">
              Back
            </span>
          </Link>
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
