import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profiles from "../../utils/api-profile";
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import { useLogin, useLoginUpdate } from "../LoginContextProvider/LoginContextProvider";
import Logo from "../Logo/Logo";
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
      <Link to="/" className="nav__logo">
        <Logo />
        <h2 className="nav__logo-text">The Learning Club</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav__menu-icon">
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </Link>
      <div className={`nav__actions-container ${!menuOpen && "nav__actions-container--hidden"}`}>
        {loggedIn ? (
          <>
            {userName && <h3 className="header header-tertiary nav__greeting">Welcome, {userName}</h3>}
            <div>
              <Button type="button" label="Log out" styleType="tertiary" action={handleClickLogout} />
            </div>
          </>
        ) : (
          <>
            <ButtonLink link="/signin" styleType="secondary" label="Sign In" />
            <ButtonLink link="/signup" styleType="primary" label="Sign Up" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
