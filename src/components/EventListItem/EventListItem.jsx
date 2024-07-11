import "./EventListItem.scss";
import Button from "../Button/Button";
import CheckAnimation from "../CheckAnimation/CheckAnimation";
import { rsvpEvent } from "../../utils/api-utils";
import axios from "axios";
import { useState } from "react";

const EventListItem = ({ event }) => {
  const [rsvpStatus, setRsvpStatus] = useState(event.status)
  const [animated, setAnimated] = useState(false)

  const handleRSVP = async (response) => {
    const token = sessionStorage.getItem("JWTtoken");
    try {
      const res = await axios.post(
        rsvpEvent(event.id),
        { response: response },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setRsvpStatus(res.data.response);
      setAnimated(true);
    } catch (error) {
      console.error(error);
    }
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
