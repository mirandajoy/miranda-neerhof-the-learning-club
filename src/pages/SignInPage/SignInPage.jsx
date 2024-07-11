import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import users from "../../utils/api-users";
import "./SignInPage.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const SignInPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
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
    loginExistingUser();
  };

  const loginExistingUser = async () => {
    const res = await users.loginUser(formValues);
    sessionStorage.setItem("JWTtoken", res.data);
    setFormValues({ email: "", password: "" });
    navigate("/");
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
        <Button type="Submit" styleType="primary" label="Sign in" />
      </form>
    </PageWrapper>
  );
};

export default SignInPage;
