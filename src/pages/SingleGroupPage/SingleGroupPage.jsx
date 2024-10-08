import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import CheckAnimation from "../../components/CheckAnimation/CheckAnimation";
import EventList from "../../components/EventList/EventList";
import EventListItem from "../../components/EventListItem/EventListItem";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import { useLogin } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import events from "../../utils/api-events";
import groups from "../../utils/api-groups";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

import "./SingleGroupPage.scss";

const SingleGroupPage = () => {
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupEvents, setGroupEvents] = useState(null);
  const [groupJoined, setGroupJoined] = useState(null);
  const [animated, setAnimated] = useState(false);
  const loggedIn = useLogin();

  const { id } = useParams();

  const getGroupDetails = async () => {
    const res = await groups.getSingleGroup(id);
    setGroupJoined(res.data.joined);
    setGroupDetails(res.data);
  };

  const handleJoinClick = async () => {
    const res = await groups.joinGroup(id);
    setGroupJoined(res.data.group_id);
    setAnimated(true);
  };

  const getGroupEvents = async () => {
    const res = await groups.getGroupEvents(groupDetails.id);
    setGroupEvents(res.data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getGroupDetails();
  }, [groupJoined]);

  useEffect(() => {
    groupDetails && getGroupEvents();
  }, [groupDetails]);

  if (groupDetails === null) {
    return <Loader />;
  }

  let groupStatus;
  switch (groupDetails.role) {
    case "owner":
      groupStatus = (
        <div className="single-group__edit-container">
          <div className="single-group__your-group-container">
            <span className="single-group__star-icon material-symbols-outlined">star</span>
            <h3 className="header header--4">Group Admin</h3>
          </div>
          <div>
            <span className="single-group__edit-icon material-symbols-outlined">edit</span>
            <div>
              <ButtonLink styleType="tertiary" label="Edit Group" link={`/groups/edit/${id}`} size="default" />
            </div>
          </div>
        </div>
      );
      break;
    case "member":
      groupStatus = (
        <div className="single-group__response-item">
          <div className="single-group__selected-response">
            <CheckAnimation animate={animated} label="Joined!" check={true} />
          </div>
        </div>
      );
      break;
    default:
      groupStatus = (
        <div className="single-group__response-item">
          <Button
            label="Join Group"
            styleType="secondary"
            action={() => {
              handleJoinClick();
            }}
            size="default"
          />
        </div>
      );
      break;
  }

  return (
    <PageWrapper header={groupDetails.name} width="medium" back>
      <div className="single-group__main-details-container">
        <div className="single-group__main-details-left">
          <span className="material-symbols-outlined">location_on</span>
          <h2 className="header header--3 single-group__header">Group Location</h2>
          {groupDetails.city ? (
            <>
              <p className="body body--dark">
                {groupDetails.city}, {groupDetails.region_name},
              </p>
              <p className="body body--dark">{groupDetails.country_name}</p>
            </>
          ) : (
            <p className="body body--dark">Remote</p>
          )}
        </div>
      </div>
      {loggedIn && <>{ groupStatus }</>}
      <div className="single-group__event-list">
        {groupEvents && (
          <EventList label="Upcoming Events" events={groupEvents} owned={groupDetails.role === "owner"} />
        )}
      </div>
    </PageWrapper>
  );
};

export default SingleGroupPage;
