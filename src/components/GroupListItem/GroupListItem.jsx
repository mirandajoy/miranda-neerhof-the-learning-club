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
        <h2 className="header header--3 group__name">{group.name}</h2>
        {group.remote === 0 && <p className="body body--dark">{group.city}</p>}
        {showNextEvent && nextEvent && (
          <p className="body body--dark">
            Next Event: {parsedDateTime.fullDate} at {parsedDateTime.fullTime}
          </p>
        )}
      </Link>
      <div className="group__response-container">
        {loggedIn && (
          <>
            {groupRole ? (
              <>
                <span className="group__star-icon material-symbols-outlined">star</span>
                <h3 className="header header--4">Your Group</h3>
              </>
            ) : (
              <>
                {groupJoined ? (
                  <CheckAnimation animate={animated} check={true} label="Joined!" />
                ) : (
                  <Button label="Join" styleType="secondary" action={handleJoinClick} size="default" />
                )}
              </>
            )}
          </>
        )}
        {!loggedIn && <ButtonLink label="Sign Up to Join" styleType="secondary" link="/signup" size="default" />}
      </div>
    </div>
  );
};

export default GroupListItem;
