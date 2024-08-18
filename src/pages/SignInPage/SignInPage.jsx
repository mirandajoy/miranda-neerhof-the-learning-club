import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { useLogin, useLoginUpdate } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import users from "../../utils/api-users";
import AlertBanner from "../../components/AlertBanner/AlertBanner";

import "./SignInPage.scss";

const SignInPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const loginUpdate = useLoginUpdate();
  const [errorMessage, setErrorMessage] = useState(null);

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
    loginExistingUser();
  };

  const loginExistingUser = async () => {
    const res = await users.loginUser(formValues);
    if (res.status == "200") {
      sessionStorage.setItem("JWTtoken", res.data);
      loginUpdate(true);
      setFormValues({ email: "", password: "" });
      navigate("/");
    } else {
      setErrorMessage(res.response.data.message);
    }
  };

  return (
    <PageWrapper header="Sign In" width="small">
      <form id="signInForm" onSubmit={handleOnSubmit} className="sign-in__form">
        <InputField
          name="email"
          type="text"
          label="Email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleOnChange}
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleOnChange}
        />
        {errorMessage && <AlertBanner message={errorMessage} />}
        <Button type="Submit" styleType="primary" label="Sign in" size="default" />
      </form>
    </PageWrapper>
  );
};

export default SignInPage;
