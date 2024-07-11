import { useEffect, useState } from "react";
import puffinCover from "../../assets/images/puffin-cover.jpg";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import EventListItem from "../../components/EventListItem/EventListItem";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import profiles from "../../utils/api-profile";
import "./HomePage.scss";

const HomePage = ({ loggedIn, userProfile }) => {
  const [userEvents, setUserEvents] = useState(null);

  const getProfileEventsList = async () => {
    const res = await profiles.getProfileEvents();
    setUserEvents(res.data);
  };

  useEffect(() => {
    if (!!loggedIn) {
      getProfileEventsList();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <PageWrapper width="full">
        <h1 className="header header--primary home__header">Landing Page</h1>
        <div className="home__button">
          <ButtonLink link="/signup" label="Sign Up" styleType="secondary" />
        </div>
      </PageWrapper>
    );
  }

  if (userEvents === null) {
    return "Loading...";
  }

  return (
    <PageWrapper preHeader="July Theme:" header="Puffins" width="large">
      <div className="home__dashboard-wrapper">
        <div className="resources">
          <img src={puffinCover} className="resources__cover-img" />
          <div className="resources__content-container">
            <div>
              <h2 className="header header--secondary resources__feature">Feature Podcast: Puffinology</h2>
              <p className="body body--dark resources__author">Sourced from: Ologies</p>
            </div>
            <div>
              <h3 className="header header--tertiary resources__listen-header">Listen On</h3>
              <div className="resources__links-container">
                <a
                  href="https://podcasts.apple.com/us/podcast/puffinology-puffins-with-jill-taylor/id1278815517?i=1000660402277"
                  target="_blank"
                  className="resources__link-wrapper"
                >
                  <span className="material-symbols-outlined">headphones</span>
                  <span className="body">Apple</span>
                </a>
                <a
                  href="https://open.spotify.com/episode/3AoyEluAL01VhzAj05ZYms"
                  target="_blank"
                  className="resources__link-wrapper"
                >
                  <span className="material-symbols-outlined">headphones</span>
                  <span className="body resources__link">Spotify</span>
                </a>
              </div>
            </div>
            <div className="additional-resources">
              <h3 className="header header--tertiary additional-resources__header">Learn More About Puffins!</h3>
              <div className="additional-resources__x-link-container">
                <span className="material-symbols-outlined">article</span>
                <a href="https://www.youtube.com/watch?v=EIUJfXk3_3w" target="_blank" className="link">
                  Know your Puffins
                </a>
              </div>
              <div className="additional-resources__x-link-container">
                <span className="material-symbols-outlined">videocam</span>
                <a href="https://www.youtube.com/watch?v=EIUJfXk3_3w" target="_blank" className="link">
                  Puffin Hunts Fish To Feed Puffling
                </a>
              </div>
              <div className="additional-resources__x-link-container">
                <span className="material-symbols-outlined">videocam</span>
                <a href="https://www.youtube.com/watch?v=EIUJfXk3_3w" target="_blank" className="link">
                  How The Adorable Atlantic Puffin Came Back From Near Extinction
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="event-list">
          <h2 className="header header--secondary event-list__header">Your Upcoming Events</h2>
          {userEvents.map((event) => {
            return <EventListItem key={event.id} event={event} />;
          })}
          <ButtonLink link="/groups" styleType="secondary" label="Join a New Group" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
