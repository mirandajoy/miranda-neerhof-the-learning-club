import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./SignUpPage.scss";
import axios from "axios";
import { createUser } from "../../utils/api-utils";

const SignUpPage = () => {
  const SignUp = async (event) => {
    event.preventDefault();

    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const res = await axios.post(createUser(), newUser);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={SignUp}>
        <h1 className="header header--primary">Sign Up</h1>
        <InputField name="name" type="text" placeholder="Name" />
        <InputField name="email" type="text" placeholder="Email" />
        <InputField name="password" type="text" placeholder="Password" />
        <Button type="Submit" label="Sign up" />
      </form>
    </>
  );
};

export default SignUpPage;
