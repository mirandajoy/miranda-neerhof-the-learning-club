import "./EventListItem.scss";
import Button from "../Button/Button";
import { rsvpEvent } from "../../utils/api-utils";
import axios from "axios";

const EventListItem = ({ event }) => {
  const handleRSVP = async (response) => {
    console.log("rsvp");
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
      <div className="event__content-container">
        <p>
          {convertedDate} at {convertedTime}
        </p>
        <p>Meeting at: {event.location}</p>
      </div>
      <div className="event__action-container">
        {event.status === "Attending" ? (
          <p>Attending!</p>
        ) : (
          <Button label="Attend" action={() => handleRSVP("Attending")} />
        )}
      </div>
    </div>
  );
};

export default EventListItem;
