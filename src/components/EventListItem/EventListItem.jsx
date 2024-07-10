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

  return (
    <div className="event">
      <p>{event.location}</p>
      {event.event_id ? (
        <div>{event.status} - Update</div>
      ) : (
        <>
          <Button label="Attending" action={() => handleRSVP("Attending")} />
          <Button label="Not attending" action={() => handleRSVP("Not Attending")} />
        </>
      )}
    </div>
  );
};

export default EventListItem;
