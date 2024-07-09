import "./ButtonLink.scss";
import { Link } from "react-router-dom";

const ButtonLink = ({link, label}) => {
  return (
    <>
      <Link to={link} className="btn-link">{label}</Link>
    </>
  );
};

export default ButtonLink;