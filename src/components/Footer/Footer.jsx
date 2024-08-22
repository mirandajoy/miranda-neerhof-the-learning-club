import "./Footer.scss";
import logo from "../../assets/images/logo-deconstructed.svg"

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h3 className="footer__brand-name">The Learning Club</h3>
        <h4 className="footer__tagline">Stay Curious</h4>
      </div>
      <img src={logo} />
    </footer>
  );
};

export default Footer;
