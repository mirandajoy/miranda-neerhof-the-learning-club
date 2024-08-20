import { useEffect, useState } from "react";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import EventList from "../../components/EventList/EventList";
import GroupListItem from "../../components/GroupListItem/GroupListItem";
import LearningFeature from "../../components/LearningFeature/LearningFeature";
import Loader from "../../components/Loader/Loader";
import { useLogin } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import profiles from "../../utils/api-profile";
import LandingPage from "../LandingPage/LandingPage";

import "./HomePage.scss";

const HomePage = () => {
  const [userEvents, setUserEvents] = useState(null);
  const [userGroups, setUserGroups] = useState(null);
  const loggedIn = useLogin();

  const getProfileEventsList = async () => {
    const res = await profiles.getProfileEvents();
    setUserEvents(res.data);
  };

  const getProfileGroupsList = async () => {
    const res = await profiles.getProfileGroups();
    setUserGroups(res.data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = sessionStorage.getItem("JWTtoken");
    token && getProfileEventsList();
    token && getProfileGroupsList();
  }, []);

  if (loggedIn === false) {
    return (
      <>
        <LandingPage />
      </>
    );
  }

  if (userEvents === null || userGroups === null) {
    return <Loader />;
  }

  return (
    <PageWrapper preHeader="July Theme:" header="Puffins" width="large">
      <div className="home__dashboard-wrapper">
        <div className="home__resources">
          <LearningFeature />
        </div>
        <div className="home__event-list">
          <div>
            <EventList label="Your Upcoming Events" events={userEvents} />
          </div>
          <div className="home__event-list">
            <div>
              <h2 className="home__group-header">Your Groups</h2>
              <div className="home__group-list">
                {userGroups.map((group) => {
                  return <GroupListItem key={group.id} group={group} simple />;
                })}
              </div>
              <div className="home__group-btn">
                <ButtonLink styleType="tertiary" label="Join A New Group" link="/groups" size="default" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
