import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="body body--light footer__logo">The Learning Club</p>
      <h2 className="header header--secondary footer__tagline">
        <span className="footer__tagline-highlight">~ </span>Stay Curious
        <span className="footer__tagline-highlight"> ~</span>
      </h2>
    </footer>
  );
};

export default Footer;
