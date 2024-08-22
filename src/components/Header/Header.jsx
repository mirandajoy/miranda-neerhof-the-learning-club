import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import profiles from "../../utils/api-profile";
import Button from "../Button/Button";
import { useLogin, useLoginUpdate } from "../LoginContextProvider/LoginContextProvider";
import logo from "../../assets/images/logo.svg";

import "./Header.scss";

const Header = () => {
  const loggedIn = useLogin();
  const loginUpdate = useLoginUpdate();
  const [userName, setUserName] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getProfileName = async () => {
    const res = await profiles.getProfile();
    setUserName(res.data.name);
  };

  const handleClickSignup = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

  const handleClickSignin = () => {
    setMenuOpen(false);
    navigate("/signin");
  };

  const handleClickLogout = () => {
    loginUpdate(false);
    setMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    loggedIn && getProfileName();
  }, [loggedIn]);

  return (
    <nav className="nav">
      <div className="nav__top-container">
        <div className="nav__logo-container">
          <img src={logo} className="nav__logo" />
          <Link to="/" className="nav__logo-text">
            The Learning Club
          </Link>
        </div>
        {menuOpen ? (
          <span onClick={() => setMenuOpen(false)} className="nav__icon material-symbols-outlined">close</span>
        ) : (
          <span onClick={() => setMenuOpen(true)} className="nav__icon material-symbols-outlined">menu</span>
        )}
      </div>
      <div className={`nav__actions-container ${menuOpen ? "nav__actions-container--open" : ""}`}>
        {loggedIn ? (
          <>
            {userName && <h3 className="header header-tertiary nav__greeting">Welcome, {userName}</h3>}
            <div>
              <Button type="button" label="Sign out" styleType="tertiary" action={handleClickLogout} size="default" />
            </div>
          </>
        ) : (
          <>
            <span className="nav__auth-button">
              <Button action={handleClickSignin} styleType="secondary" label="Sign In" size="min-width-m" />
            </span>
            <span className="nav__auth-button">
              <Button action={handleClickSignup} styleType="primary" label="Sign Up" size="min-width-m" />
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
