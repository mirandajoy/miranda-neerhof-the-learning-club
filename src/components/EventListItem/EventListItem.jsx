import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import events from "../../utils/api-events";
import groups from "../../utils/api-groups";
import parseDateTime from "../../utils/time-parse";
import Button from "../Button/Button";
import CheckAnimation from "../CheckAnimation/CheckAnimation";
import { useLogin } from "../LoginContextProvider/LoginContextProvider";

import "./EventListItem.scss";

const EventListItem = ({ event }) => {
  const [rsvpStatus, setRsvpStatus] = useState(event.status);
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupJoined, setGroupJoined] = useState(null);
  const parsedDateTime = parseDateTime(event.time);
  const [animated, setAnimated] = useState(false);
  const loggedIn = useLogin();

  const getGroupDetails = async () => {
    const res = await groups.getSingleGroup(event.joined);
    setGroupDetails(res.data);
    setGroupJoined(res.data.joined);
  };

  const handleRSVP = async (response) => {
    const body = { response: response };
    const res = !event.status
      ? await events.rsvpEvent(event.id, body)
      : await events.updateEvent(event.id, event.rsvp_id, body);
    setRsvpStatus(res.data.status);
    setAnimated(true);
  };

  useEffect(() => {
    getGroupDetails();
  }, [event]);

  return (
    <div className="event">
      <Link to={`/events/${event.id}`} className="event__content-container">
        <div className="event__date-container">
          <p className="body body--dark body--small event__month">{parsedDateTime.month}</p>
          <h3 className="event__day">{parsedDateTime.day}</h3>
        </div>
        <div className="event__details-container">
          {groupDetails && <h4 className="event__header">{groupDetails.name}</h4>}
          <p className="event__event-details">
            <span>{parsedDateTime.fullTime}</span>
            {event.location ? (
              <span> at {event.location}</span>
            ) : (
              <span> Remote</span>
            )}
          </p>
        </div>
      </Link>
      {groupJoined && loggedIn && (
        <div className="event__action-container">
          {rsvpStatus && rsvpStatus.toLowerCase() === "attending" ? (
            <CheckAnimation animate={animated} label="Attending!" check="true" />
          ) : (
            <Button label="Attend" styleType="secondary" action={() => handleRSVP("Attending")} size="default" />
          )}
        </div>
      )}
    </div>
  );
};

export default EventListItem;
