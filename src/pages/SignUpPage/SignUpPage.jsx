import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./SignUpPage.scss";
import axios from "axios";
import { createUser } from "../../utils/api-utils";
import { validateEmail, validatePassword, validateSignUp } from "../../utils/validation-utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    try {
      const res = await axios.post(createUser(), formValues);
      sessionStorage.setItem("JWTtoken", res.data);
      setFormValues({ name: "", email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="sign-up">
      <h1 className="header header--primary sign-up__header">Sign Up</h1>
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
        <Button type="Submit" label="Sign up" />
      </form>
    </section>
  );
};

export default SignUpPage;
