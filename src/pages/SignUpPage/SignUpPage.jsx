import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertBanner from "../../components/AlertBanner/AlertBanner";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { useLoginUpdate } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import users from "../../utils/api-users";
import { validateEmail, validatePassword, validateSignUp } from "../../utils/validation-utils";
import "./SignUpPage.scss";

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    nameError: null,
    emailError: null,
    passwordError: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const loginUpdate = useLoginUpdate();

  const handleOnChange = (event) => {
    const target = event.target.name;
    const newValues = {
      ...formValues,
      [target]: event.target.value,
    };
    setFormValues(newValues);
    return newValues;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const res = validateSignUp(formValues);
    setFormErrors(res);

    res.nameError === null && res.emailError === null && res.passwordError === null && createNewUser();
  };

  const createNewUser = async () => {
    const res = await users.createUser(formValues);
    if (res.status == "201") {
      sessionStorage.setItem("JWTtoken", res.data);
      loginUpdate(true);
      setFormValues({ name: "", email: "", password: "" });
      navigate("/");
    } else {
      setErrorMessage(res.response.data.message);
    }
  };

  return (
    <PageWrapper width="small">
      <FormWrapper header="Sign Up" id="signUpForm" onSubmit={handleOnSubmit} submitLabel="Sign Up">
        <div className="sign-up__field-container">
          <InputField
            name="name"
            type="text"
            label="Name"
            placeholder="Name"
            value={formValues.name}
            errorMessage={formErrors.nameError}
            onChange={handleOnChange}
          />
          <InputField
            name="email"
            type="text"
            label="Email"
            placeholder="Email"
            value={formValues.email}
            errorMessage={formErrors.emailError}
            onChange={handleOnChange}
            onBlur={(event) => {
              const recentUpdate = handleOnChange(event);
              const res = validateEmail(recentUpdate.email);
              setFormErrors({
                ...formErrors,
                emailError: res,
              });
            }}
          />
          <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={formValues.password}
            errorMessage={formErrors.passwordError}
            onChange={handleOnChange}
            onBlur={(event) => {
              const recentUpdate = handleOnChange(event);
              const res = validatePassword(recentUpdate.password);
              setFormErrors({
                ...formErrors,
                passwordError: res,
              });
            }}
          />
          {errorMessage && <AlertBanner message={errorMessage} />}
        </div>
      </FormWrapper>
    </PageWrapper>
  );
};

export default SignUpPage;
