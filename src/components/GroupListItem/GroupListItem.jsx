import "./GroupListItem.scss";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { getGroupEvents, joinGroup } from "../../utils/api-utils";
import axios from "axios";
import CheckAnimation from "../CheckAnimation/CheckAnimation";

const GroupListItem = ({ group }) => {
  const [nextEvent, setNextEvent] = useState(null);
  const [groupJoined, setGroupJoined] = useState(group.group_id);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    getGroupEvent();
  }, [groupJoined]);

  const getGroupEvent = async () => {
    try {
      const res = await axios.get(getGroupEvents(group.id));
      setNextEvent(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinClick = async () => {
    const token = sessionStorage.getItem("JWTtoken");
    try {
      const res = await axios.post(joinGroup(group.id), null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setGroupJoined(res.data.group_id);
      setAnimated(true);
    } catch (error) {
      console.error(error);
    }
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
    <div className="group">
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
      <div className="group__join-btn">
        {group && groupJoined ? (
          <div className="group__response-container">
            <CheckAnimation animate={animated} />
            <span className="body body--dark group__response">Joined!</span>
          </div>
        ) : (
          <Button label="Join" styleType="secondary" action={handleJoinClick} />
        )}
      </div>
    </div>
  );
};

export default GroupListItem;
