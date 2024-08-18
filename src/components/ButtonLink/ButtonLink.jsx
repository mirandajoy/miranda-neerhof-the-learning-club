import "./ButtonLink.scss";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const ButtonLink = ({link, label, styleType, anchor, size}) => {
  return (
    <>
      {anchor && <HashLink to={link} className={`btn-link btn-link--${styleType} btn-link--${size}`}>{label}</HashLink>}
      {!anchor && <Link to={link} className={`btn-link btn-link--${styleType} btn-link--${size}`}>{label}</Link>}
    </>
  );
};

export default ButtonLink;