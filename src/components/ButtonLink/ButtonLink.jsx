import "./ButtonLink.scss";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const ButtonLink = ({link, label, styleType, anchor}) => {
  return (
    <>
      {anchor && <HashLink to={link} className={`btn-link btn-link--${styleType}`}>{label}</HashLink>}
      {!anchor && <Link to={link} className={`btn-link btn-link--${styleType}`}>{label}</Link>}
    </>
  );
};

export default ButtonLink;