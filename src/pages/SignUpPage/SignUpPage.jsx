import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import users from "../../utils/api-users";
import { validateEmail, validatePassword, validateSignUp } from "../../utils/validation-utils";
import "./SignUpPage.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useLogin, useLoginUpdate } from "../../components/LoginContextProvider/LoginContextProvider";

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
    sessionStorage.setItem("JWTtoken", res.data);
    loginUpdate(true);
    setFormValues({ name: "", email: "", password: "" });
    navigate("/");
  };

  return (
    <PageWrapper header="Sign Up" width="small">
      <form id="signUpForm" onSubmit={handleOnSubmit} className="sign-up__form">
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
        <Button type="Submit" styleType="primary" label="Sign up" />
      </form>
    </PageWrapper>
  );
};

export default SignUpPage;
