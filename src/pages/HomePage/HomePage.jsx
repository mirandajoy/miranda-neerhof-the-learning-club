import "./HomePage.scss";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import { getProfileEvents } from "../../utils/api-utils";
import { useState, useEffect } from "react";
import axios from "axios";
import EventListItem from "../../components/EventListItem/EventListItem";

const HomePage = ({ loggedIn, userProfile }) => {
  const [userEvents, setUserEvents] = useState(null);

  const getProfileEventsList = async () => {
    const token = sessionStorage.getItem("JWTtoken");
    try {
      const res = await axios.get(getProfileEvents(), {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUserEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!!loggedIn) {
      getProfileEventsList();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <main className="home">
        <h1 className="header header--primary home__header">Landing Page</h1>
        <div className="home__button">
          <ButtonLink link="/signup" label="Sign Up" />
        </div>
      </main>
    );
  }

  if (userEvents === null) {
    return "Loading...";
  }

  return (
    <main className="home">
      <h1 className="header header--primary home__header">Learning Materials</h1>
      <h2>Hi, {userProfile}</h2>
      {userEvents.map((event) => {
        return <EventListItem key={event.id} event={event} />;
      })}
    </main>
  );
};

export default HomePage;
