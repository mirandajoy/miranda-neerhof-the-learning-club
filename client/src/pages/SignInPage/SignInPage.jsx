import "./SignInPage.scss";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { loginUser } from "../../utils/api-utils";
import axios from "axios";

const SignInPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

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
    try {
      const res = await axios.post(loginUser(), formValues);
      console.log(res);
      setFormValues({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="sign-in">
      <h1 className="header header--primary sign-in__header">Sign In</h1>
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
        <Button type="Submit" label="Sign in" />
      </form>
    </section>
  );
};

export default SignInPage;
