import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import groups from "../../utils/api-groups";
import events from "../../utils/api-events";
import "./SingleGroupPage.scss";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CheckAnimation from "../../components/CheckAnimation/CheckAnimation";
import EventListItem from "../../components/EventListItem/EventListItem";
import EventList from "../../components/EventList/EventList";

const SingleGroupPage = () => {
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupEvents, setGroupEvents] = useState(null);
  const [groupJoined, setGroupJoined] = useState(null);
  const [animated, setAnimated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const checkLogin = () => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!!token) {
      setLoggedIn(true);
    }
    getGroupDetails();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setLoggedIn(false);
    navigate("/");
  };

  const getGroupDetails = async () => {
    const res = await groups.getSingleGroup(id);
    setGroupJoined(res.data.group_id);
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
    checkLogin();
  }, []);

  useEffect(() => {
    groupDetails && getGroupEvents();
  }, [groupDetails]);

  if (groupDetails === null) {
    return "Loading...";
  }

  return (
    <>
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
      <PageWrapper header={groupDetails.name} width="small" back={"/groups"}>
        <div className="single-group__main-details-container">
          <div className="single-group__main-details-left">
            <span className="material-symbols-outlined">location_on</span>
            <h2 className="header header--secondary single-group__header">Group Location</h2>
            {groupDetails.city ? (
              <>
                <p className="body body--dark">
                  {groupDetails.city}, {groupDetails.state},
                </p>
                <p className="body body--dark">{groupDetails.country}</p>
              </>
            ) : (
              <p className="body body--dark">Remote on Zoom</p>
            )}
          </div>
        </div>
        {loggedIn && (
          <div className="single-group__response-item">
            {groupJoined ? (
              <div className="single-group__selected-response">
                <CheckAnimation animate={animated} label="Joined!" check={true} />
              </div>
            ) : (
              <Button
                label="Join Group"
                styleType="secondary"
                action={() => {
                  handleJoinClick();
                }}
              />
            )}
          </div>
        )}
        <div className="single-group__event-list">
          {groupEvents && <EventList label="Upcoming Events" events={groupEvents} loggedIn={loggedIn} />}
        </div>
      </PageWrapper>
    </>
  );
};

export default SingleGroupPage;
