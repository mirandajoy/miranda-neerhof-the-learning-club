import "./GroupListItem.scss";
import Button from "../Button/Button";

const GroupListItem = ({ city, state, country }) => {
  return (
    <div className="group">
      <div className="group__content-container">
        <h2 className="group__name">{city}</h2>
        <div className="group__location-container">
          <p>{state}</p>
          <p>{country}</p>
        </div>
      </div>
      {city && <Button label="Join" />}
    </div>
  );
};

export default GroupListItem;
