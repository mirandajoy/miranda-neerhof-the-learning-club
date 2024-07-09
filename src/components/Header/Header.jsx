import "./Header.scss";
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import { Link } from "react-router-dom";

const Header = ({ userProfile, handleLogout }) => {
  if (!userProfile) {
    return (
      <nav className="nav">
        <Link to="/" className="nav__logo">The Learning Club</Link>
        <div className="nav__actions-container">
          <ButtonLink link="/signup" label="Sign Up" />
          <ButtonLink link="/signin" label="Sign In" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav">
      <Link to="/" className="nav__logo">The Learning Club</Link>
      <div>
        <Button type="button" label="Log out" action={handleLogout} />
      </div>
    </nav>
  );
};

export default Header;
