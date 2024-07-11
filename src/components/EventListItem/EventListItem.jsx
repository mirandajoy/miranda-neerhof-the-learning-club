import { useState } from "react";
import events from "../../utils/api-events";
import Button from "../Button/Button";
import CheckAnimation from "../CheckAnimation/CheckAnimation";
import "./EventListItem.scss";

const EventListItem = ({ event }) => {
  const [rsvpStatus, setRsvpStatus] = useState(event.status);
  const [animated, setAnimated] = useState(false);

  const handleRSVP = async (response) => {
    const body = { response: response };
    const res = await events.rsvpEvent(event.id, body);
    setRsvpStatus(res.data.response);
    setAnimated(true);
  };

  const handleRSVPUpdate = async (response) => {
    console.log({ response });
  };

  const convertedDate = new Date(event.time).toLocaleDateString("en-us", {
    timezone: "America/Halifax",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const convertedTime = new Date(event.time).toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    timezone: "America/New_York",
  });

  return (
    <div className="event">
      <div className="event__date-container">
        <p className="body body--dark body--small event__month">September</p>
        <p className="body body--dark body--display event__day">25</p>
      </div>
      <div className="event__details-container">
        <p className="body body--dark">Location: {event.location}</p>
        <p className="body body--dark">Time: {convertedTime}</p>
      </div>
      <div className="event__action-container">
        {rsvpStatus === "Attending" ? (
          <div className="event__response-container">
            <CheckAnimation animate={animated} />
            <span className="body body--dark event__response">Attending!</span>
          </div>
        ) : (
          <Button label="Attend" styleType="secondary" action={() => handleRSVP("Attending")} />
        )}
      </div>
    </div>
  );
};

export default EventListItem;
