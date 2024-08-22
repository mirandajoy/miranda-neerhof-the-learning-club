import { useState } from "react";
import Button from "../Button/Button";
import EmptyList from "../EmptyList/EmptyList";
import EventListItem from "../EventListItem/EventListItem";
import "./EventList.scss";
import ButtonLink from "../ButtonLink/ButtonLink";

const EventList = ({ label, events, owned }) => {
  const [showAll, setShowAll] = useState(false);

  const displayList = showAll ? events : events.slice(0, 3);

  return (
    <div className="event-list">
      <h2 className="header header--3 event-list__header">{label}</h2>
      {events.length < 1 ? (
        <>
          <div className="event-list__list-container">
            <EmptyList text="You don't have any upcoming events" owned />
          </div>
        </>
      ) : (
        <div className="event-list__list-container">
          <div className="event-list__list-items">
            {displayList.map((event) => {
              return <EventListItem key={event.id} event={event} />;
            })}
          </div>
          <div className="event-list__btn-container">
            {events.length > 3 && (
              <>
                {!showAll && (
                  <Button
                    styleType="tertiary"
                    label="See All Events"
                    action={() => {
                      setShowAll(true);
                    }}
                    size="default"
                  />
                )}
                {showAll && (
                  <Button
                    styleType="tertiary"
                    label="See Fewer Events"
                    action={() => {
                      setShowAll(false);
                    }}
                    size="default"
                  />
                )}
              </>
            )}
            {owned && <ButtonLink styleType="secondary" label="Create Event" link="/events/create" size="default" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
