import "./ButtonLink.scss";
import { Link } from "react-router-dom";

const ButtonLink = ({link, label, styleType}) => {
  return (
    <>
      <Link to={link} className={`btn-link btn-link--${styleType}`}>{label}</Link>
    </>
  );
};

export default ButtonLink;