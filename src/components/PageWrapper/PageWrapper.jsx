import "./PageWrapper.scss";

const PageWrapper = ({ preHeader, header, width, children }) => {
  return (
    <main className={`page-wrapper page-wrapper--${width}`}>
      {header && (
        <div className="page-wrapper__header-container">
          {preHeader && <h3 className="header header--tertiary">{preHeader}</h3>}
          <h1 className="header header--primary page-wrapper__header">{header}</h1>
        </div>
      )}
      {children}
    </main>
  );
};

export default PageWrapper;
