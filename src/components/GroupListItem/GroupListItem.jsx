import { useEffect, useState } from "react";
import groups from "../../utils/api-groups";
import Button from "../Button/Button";
import CheckAnimation from "../CheckAnimation/CheckAnimation";
import "./GroupListItem.scss";
import { Link } from "react-router-dom";
import ButtonLink from "../ButtonLink/ButtonLink";

const GroupListItem = ({ group, loggedIn }) => {
  const [nextEvent, setNextEvent] = useState(null);
  const [groupJoined, setGroupJoined] = useState(group.group_id);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    getGroupEvent();
  }, [groupJoined]);

  const getGroupEvent = async () => {
    const res = await groups.getGroupEvents(group.id);
    setNextEvent(res.data[0]);
  };

  const handleJoinClick = async () => {
    const res = await groups.joinGroup(group.id);
    setGroupJoined(res.data.group_id);
    setAnimated(true);
  };

  const convertedDate =
    nextEvent &&
    new Date(nextEvent.time).toLocaleDateString("en-us", {
      timezone: "America/Halifax",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const convertedTime =
    nextEvent &&
    new Date(nextEvent.time).toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      timezone: "America/New_York",
    });

  return (
    <Link to={`/groups/${group.id}`} className="group">
      <div className="group__content-container">
        <div className="group__group-details">
          <h2 className="header header--secondary group__name">{group.city}</h2>
          <div className="group__location-container">
            <p className="body body--dark">
              {group.state}, {group.country}
            </p>
          </div>
        </div>
        {nextEvent && (
          <p className="body body--dark group__next-event">
            Next Event: {convertedDate} at {convertedTime}
          </p>
        )}
      </div>
      {loggedIn && (
        <div className="group__join-btn">
          {group && groupJoined ? (
            <div className="group__response-container">
              <CheckAnimation animate={animated} check={true} label="Joined!" />
            </div>
          ) : (
            <Button label="Join" styleType="secondary" action={handleJoinClick} />
          )}
        </div>
      )}
      {!loggedIn && (
        <div className="group__sign-up-btn">
          <ButtonLink label="Sign Up to Join" styleType="secondary" link="/signup" />
        </div>
      )}
    </Link>
  );
};

export default GroupListItem;
