import "./Header.scss";
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useLogin, useLoginUpdate } from "../LoginContextProvider/LoginContextProvider";

const Header = () => {
  const loggedIn =  useLogin();
  const loginUpdate =  useLoginUpdate();

  if (!loggedIn) {
    return (
      <nav className="nav">
        <div className="nav__logo-container">
          <Logo />
          <Link to="/" className="nav__logo">
            The Learning Club
          </Link>
        </div>
        <div className="nav__actions-container">
          <ButtonLink link="/signin" styleType="secondary" label="Sign In" />
          <ButtonLink link="/signup" styleType="primary" label="Sign Up" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav">
      <div className="nav__logo-container">
        <Logo />
        <Link to="/" className="nav__logo">
          The Learning Club
        </Link>
      </div>
      <div>
        <Button type="button" label="Log out" styleType="secondary" action={() => loginUpdate(false)} />
      </div>
    </nav>
  );
};

export default Header;
