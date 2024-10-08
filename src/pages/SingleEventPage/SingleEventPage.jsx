import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import CheckAnimation from "../../components/CheckAnimation/CheckAnimation";
import { useLogin } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import events from "../../utils/api-events";
import groups from "../../utils/api-groups";
import parseDateTime from "../../utils/time-parse";
import Loader from "../../components/Loader/Loader";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import "./SingleEventPage.scss";

const SingleEventPage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupJoined, setGroupJoined] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(eventDetails && eventDetails.status);
  const [animated, setAnimated] = useState(false);
  const loggedIn = useLogin();

  const parsedDateTime = eventDetails && parseDateTime(eventDetails.time);
  const { id } = useParams();

  const getEventDetails = async () => {
    const res = await events.getSingleEvent(id);
    setEventDetails(res.data);
  };

  const getGroupDetails = async () => {
    const res = await groups.getSingleGroup(eventDetails.group_id);
    setGroupDetails(res.data);
    setGroupJoined(res.data.joined);
  };

  const handleRSVP = async (response) => {
    const body = { response: response };
    const res = !eventDetails.status
      ? await events.rsvpEvent(eventDetails.id, body)
      : await events.updateEvent(eventDetails.id, eventDetails.rsvp_id, body);
    setRsvpStatus(res.data.response);
    setAnimated(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getEventDetails();
  }, [rsvpStatus]);

  useEffect(() => {
    eventDetails && getGroupDetails();
  }, [eventDetails]);

  if (eventDetails === null || groupDetails === null) {
    return <Loader />;
  }

  const rsvpText = eventDetails.status;

  return (
    <PageWrapper header={groupDetails.name} width="medium" back>
      <div className="single-event__main-details-container">
        <div className="single-event__main-details-left">
          <span className="material-symbols-outlined">event</span>
          <h2 className="header header--3 single-event__header">Meet on</h2>
          <p className="body body--dark">{parsedDateTime.fullDate}</p>
          <p className="body body--dark">{parsedDateTime.fullTime}</p>
        </div>
        <div className="single-event__main-details-right">
          <span className="material-symbols-outlined">location_on</span>
          {groupDetails.remote === 0 ? (
            <>
              <h2 className="header header--3 single-event__header">Meet at</h2>
              <p className="body body--dark">{eventDetails.location}</p>
              <p className="body body--dark">{eventDetails.address}</p>
            </>
          ) : (
            <>
              <h2 className="header header--3 single-event__header">Meet On</h2>
              <p className="body body--dark body--small">
                {loggedIn ? (
                  <a href={eventDetails.remote_link} target="_blank" className="single-event__link">
                    Video call
                  </a>
                ) : (
                  <span className="body body--dark">Video call</span>
                )}
              </p>
            </>
          )}
        </div>
      </div>
      {groupDetails.role !== "owner" && groupJoined && loggedIn && (
        <div className="single-event__response-btn-container">
          <div className="single-event__response-item">
            {rsvpText && rsvpText.toLowerCase() === "attending" ? (
              <div className="single-event__selected-response">
                <CheckAnimation animate={animated} label="Attending!" check={true} />
              </div>
            ) : (
              <Button
                label="Attend"
                styleType="secondary"
                action={() => {
                  handleRSVP("attending");
                }}
                size="full-width"
              />
            )}
          </div>
          <div className="single-event__response-item">
            {rsvpText && rsvpText.toLowerCase() === "not attending" ? (
              <div className="single-event__selected-response">
                <CheckAnimation animate={animated} label="Not Attending" icon="cancel" />
              </div>
            ) : (
              <Button
                label="Not This Time"
                styleType="secondary"
                action={() => {
                  handleRSVP("not attending");
                }}
                size="full-width"
              />
            )}
          </div>
          <div className="single-event__response-item">
            {rsvpText && rsvpText.toLowerCase() === "maybe" ? (
              <div className="single-event__selected-response">
                <CheckAnimation animate={animated} label="Maybe" icon="help" />
              </div>
            ) : (
              <Button
                label="Maybe"
                styleType="secondary"
                action={() => {
                  handleRSVP("maybe");
                }}
                size="full-width"
              />
            )}
          </div>
        </div>
      )}
      {groupDetails.role === "owner" && (
        <div className="single-group__edit-container">
          <div className="single-group__your-group-container">
            <span className="single-group__star-icon material-symbols-outlined">star</span>
            <h3 className="header header--4">Your Event</h3>
          </div>
          <div>
            <span className="single-group__edit-icon material-symbols-outlined">edit</span>
            <div>
              <ButtonLink styleType="tertiary" label="Edit Event" link={`/groups/edit/${id}`} size="default" />
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default SingleEventPage;
