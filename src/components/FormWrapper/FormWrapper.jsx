import "./FormWrapper.scss";
import Button from "../Button/Button";

const FormWrapper = ({ header, children, id, onSubmit, submitLabel }) => {
  return (
    <div className="form">
      <h2 className="header header--2 form__header">{header}</h2>
      <form id={id} onSubmit={onSubmit} className="form__container">
        {children}
        <div className="form__submit-button">
          <Button type="Submit" styleType="primary" label={submitLabel} size="min-width" />
        </div>
      </form>
    </div>
  );
};

export default FormWrapper;
