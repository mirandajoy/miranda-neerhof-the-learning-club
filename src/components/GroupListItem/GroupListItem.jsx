import "./GroupListItem.scss";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { getGroupEvents, joinGroup } from "../../utils/api-utils";
import axios from "axios";

const GroupListItem = ({ group }) => {
  const [nextEvent, setNextEvent] = useState(null);
  const [groupJoined, setGroupJoined] = useState(false);

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
      setGroupJoined(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group">
      <div className="group__content-container">
        <h2 className="group__name">{group.city}</h2>
        <div className="group__location-container">
          <p>{group.state}</p>
          <p>{group.country}</p>
        </div>
      </div>
      {group && group.group_id ? <div>DONE</div> : <Button label="Join" action={handleJoinClick} />}
      {nextEvent && (
        <div>
          Next Event: {nextEvent.location} @ {nextEvent.time}
        </div>
      )}
    </div>
  );
};

export default GroupListItem;
