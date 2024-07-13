import { useState } from "react";
import { Link } from "react-router-dom";
import events from "../../utils/api-events";
import parseDateTime from "../../utils/time-parse";
import Button from "../Button/Button";
import CheckAnimation from "../CheckAnimation/CheckAnimation";
import "./EventListItem.scss";

const EventListItem = ({ event }) => {
  const [rsvpStatus, setRsvpStatus] = useState(event.status);
  const parsedDateTime = parseDateTime(event.time);
  const [animated, setAnimated] = useState(false);

  const handleRSVP = async (response) => {
    const body = { response: response };
    const res = await events.rsvpEvent(event.id, body);
    setRsvpStatus(res.data.response);
    setAnimated(true);
  };

  return (
    <div className="event">
      <Link to={`events/${event.id}`} className="event__content-container">
        <div className="event__date-container">
          <p className="body body--dark body--small event__month">{parsedDateTime.month}</p>
          <p className="body body--dark body--display event__day">{parsedDateTime.day}</p>
        </div>
        <div className="event__details-container">
          <p className="body body--dark">Hosted by: Halifax Group</p>
          <div>
            <p className="body body--dark body--small">Meet at {event.location}</p>
            <p className="body body--dark body--small">{parsedDateTime.fullTime}</p>
          </div>
        </div>
      </Link>
      <div className="event__action-container">
        {rsvpStatus && rsvpStatus.toLowerCase() === "attending" ? (
          <CheckAnimation animate={animated} label="Attending!" check="true" />
        ) : (
          <Button label="Attend" styleType="secondary" action={() => handleRSVP("Attending")} />
        )}
      </div>
    </div>
  );
};

export default EventListItem;
