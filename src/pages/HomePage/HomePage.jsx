import { useEffect, useState } from "react";
import puffinCover from "../../assets/images/puffin-cover.jpg";
import EventList from "../../components/EventList/EventList";
import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import profiles from "../../utils/api-profile";
import LandingPage from "../LandingPage/LandingPage";
import "./HomePage.scss";

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEvents, setUserEvents] = useState(null);

  const getProfileEventsList = async () => {
    const res = await profiles.getProfileEvents();
    setUserEvents(res.data);
  };

  const checkLogin = () => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!!token) {
      setLoggedIn(true);
      getProfileEventsList();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setLoggedIn(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (loggedIn === false) {
    return (
      <>
        <Header loggedIn={loggedIn} handleLogout={handleLogout} />
        <LandingPage />
      </>
    );
  }

  return (
    <>
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
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
          <div className="home__event-list">
            {userEvents && <EventList label="Your Upcoming Events" loggedIn={loggedIn} events={userEvents} />}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default HomePage;
