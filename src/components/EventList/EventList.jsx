import { useEffect, useState } from "react";
import profiles from "../../utils/api-profile";
import ButtonLink from "../ButtonLink/ButtonLink";
import Button from "../Button/Button";
import EventListItem from "../EventListItem/EventListItem";
import EmptyList from "../EmptyList/EmptyList";
import "./EventList.scss";
import { useLogin } from "../LoginContextProvider/LoginContextProvider";

const EventList = ({ label, events }) => {
  const [showAll, setShowAll] = useState(false);

  const displayList = showAll ? events : events.slice(0, 3);

  return (
    <div className="event-list">
      <h2 className="header header--secondary event-list__header">{label}</h2>
      {events.length < 1 ? (
        <>
          <div className="event-list__list-container">
            <EmptyList text="You don't have any upcoming events" />
          </div>
          <ButtonLink link="/groups" styleType="secondary" label="Join a New Group" />
        </>
      ) : (
        <div className="event-list__list-container">
          <div className="event-list__list-items">
            {displayList.map((event) => {
              return <EventListItem key={event.id} event={event} />;
            })}
          </div>
          {events.length > 3 && (
            <>
              {!showAll && (
                <Button
                  styleType="tertiary"
                  label="See All Events"
                  action={() => {
                    setShowAll(true);
                  }}
                />
              )}
              {showAll && (
                <Button
                  styleType="tertiary"
                  label="See Fewer Events"
                  action={() => {
                    setShowAll(false);
                  }}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
