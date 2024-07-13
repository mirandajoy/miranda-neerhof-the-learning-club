import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import events from "../../utils/api-events";
import parseDateTime from "../../utils/time-parse";
import "./SingleEventPage.scss";
import Button from "../../components/Button/Button";
import CheckAnimation from "../../components/CheckAnimation/CheckAnimation";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const SingleEventPage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(eventDetails && eventDetails.status);
  const [animated, setAnimated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!!token) {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setLoggedIn(false);
    navigate("/");
  };

  const parsedDateTime = eventDetails && parseDateTime(eventDetails.time);
  const { id } = useParams();

  const getEventDetails = async () => {
    const res = await events.getSingleEvent(id);
    setEventDetails(res.data);
  };

  const handleRSVP = async (response) => {
    const body = { response: response };
    const res = !eventDetails.status
      ? await events.rsvpEvent(eventDetails.id, body)
      : await events.updateEvent(eventDetails.id, eventDetails.rsvp_id, body);
    setRsvpStatus(res.data.response);
    console.log(res.data.response);
    setAnimated(true);
  };

  useEffect(() => {
    getEventDetails();
    checkLogin();
  }, [rsvpStatus]);

  if (eventDetails === null) {
    return "Loading...";
  }

  const rsvpText = eventDetails.status;

  return (
    <>
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
      <PageWrapper header={`${parsedDateTime.month}, ${parsedDateTime.day}`} width="small" back="/">
        <div className="event__main-details-container">
          <div className="event__main-details-left">
            <span className="material-symbols-outlined">location_on</span>
            <h2 className="header header--secondary event__header">Meet at</h2>

            <p className="body body--dark">{eventDetails.location}</p>
            <p className="body body--dark">{eventDetails.address},</p>
            <p className="body body--dark">Halifax, Nova Scotia,</p>
            <p className="body body--dark">Canada</p>
          </div>
          <div className="event__main-details-right">
            <span className="material-symbols-outlined">event</span>
            <h2 className="header header--secondary event__header">Meet on</h2>
            <p className="body body--dark">{parsedDateTime.fullDate}</p>
            <p className="body body--dark">{parsedDateTime.fullTime}</p>
          </div>
        </div>
        <div className="event__response-btn-container">
          <div className="event__response-item">
            {rsvpText && rsvpText.toLowerCase() === "attending" ? (
              <div className="event__selected-response">
                <CheckAnimation animate={animated} label="Attending!" check={true} />
              </div>
            ) : (
              <Button
                label="Attend"
                styleType="secondary"
                action={() => {
                  handleRSVP("attending");
                }}
              />
            )}
          </div>
          <div className="event__response-item">
            {rsvpText && rsvpText.toLowerCase() === "not attending" ? (
              <div className="event__selected-response">
                <CheckAnimation animate={animated} label="Not Attending" icon="cancel" />
              </div>
            ) : (
              <Button
                label="Not This Time"
                styleType="secondary"
                action={() => {
                  handleRSVP("not attending");
                }}
              />
            )}
          </div>
          <div className="event__response-item">
            {rsvpText && rsvpText.toLowerCase() === "maybe" ? (
              <div className="event__selected-response">
                <CheckAnimation animate={animated} label="Maybe" icon="help" />
              </div>
            ) : (
              <Button
                label="Maybe"
                styleType="secondary"
                action={() => {
                  handleRSVP("maybe");
                }}
              />
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default SingleEventPage;
