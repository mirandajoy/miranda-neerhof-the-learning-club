import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import groups from "../../utils/api-groups";
import parseDateTime from "../../utils/time-parse";
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import CheckAnimation from "../CheckAnimation/CheckAnimation";
import { useLogin } from "../LoginContextProvider/LoginContextProvider";

import "./GroupListItem.scss";

const GroupListItem = ({ group, showNextEvent, showResponse }) => {
  const [nextEvent, setNextEvent] = useState(null);
  const [groupJoined, setGroupJoined] = useState(group.joined);
  const [groupRole, setGroupRole] = useState(group.role === "owner" ? true : false);
  const [animated, setAnimated] = useState(false);
  const parsedDateTime = nextEvent && parseDateTime(nextEvent.time);
  const loggedIn = useLogin();

  const getGroupEvent = async () => {
    const res = await groups.getGroupEvents(group.id);
    setNextEvent(res.data[0]);
  };

  const handleJoinClick = async () => {
    const res = await groups.joinGroup(group.id);
    setGroupJoined(res.data.group_id);
    setAnimated(true);
  };

  useEffect(() => {
    getGroupEvent();
  }, [groupJoined]);

  return (
    <div className="group">
      <Link to={`/groups/${group.id}`} className="group__content-container">
        <div className="group__group-details">
          <h2 className="header header--secondary group__name">{group.name}</h2>
          {group.remote === 0 && (
            <div className="group__location-container">
              <p className="body body--dark">{group.region_name}</p>
            </div>
          )}
        </div>
        {showNextEvent && nextEvent && (
          <p className="body body--dark group__next-event">
            Next Event: {parsedDateTime.fullDate} at {parsedDateTime.fullTime}
          </p>
        )}
      </Link>
      {showResponse && loggedIn && (
        <div className="group__join-btn">
          {group && groupRole && (<p className="body">My Group</p>)}
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
    </div>
  );
};

export default GroupListItem;
