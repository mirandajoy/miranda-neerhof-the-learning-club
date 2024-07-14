import "./Header.scss";
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useLogin, useLoginUpdate } from "../LoginContextProvider/LoginContextProvider";
import { useEffect, useState } from "react";
import profiles from "../../utils/api-profile";

const Header = () => {
  const loggedIn = useLogin();
  const loginUpdate = useLoginUpdate();
  const [userName, setUserName] = useState();

  const getProfileName = async () => {
    const res = await profiles.getProfile();
    setUserName(res.data.name);
  };

  useEffect(() => {
    loggedIn && getProfileName();
  }, [loggedIn]);

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
      <div className="nav__actions-container">
        {userName && <h3 className="header header-tertiary nav__greeting">Welcome, {userName}</h3>}
        <div>
          <Button type="button" label="Log out" styleType="tertiary" action={() => loginUpdate(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
