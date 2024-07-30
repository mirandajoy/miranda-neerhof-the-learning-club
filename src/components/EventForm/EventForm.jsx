import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import InputSelect from "../../components/InputSelect/InputSelect";
import events from "../../utils/api-events";
import profiles from "../../utils/api-profile";
import parseDateTime from "../../utils/time-parse";

import "./EventForm.scss";

const EventForm = () => {
  const [formValues, setFormValues] = useState({
    group: "",
    location: "",
    address: "",
    remote_link: "",
    date: "",
    time: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [ownedGroups, setOwnedGroups] = useState(null);
  const [remoteGroup, setRemoteGroup] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const target = event.target.name;

    const newValues = {
      ...formValues,
      [target]: event.target.value,
    };
    setFormValues(newValues);
    target === "group" &&
      setRemoteGroup(ownedGroups.find((group) => group.id == event.target.value).remote ? true : false);
    return newValues;
  };

  const getOwnedGroups = async () => {
    const res = await profiles.getProfileGroups();
    const ownedGroups = res.data.filter((group) => group.role === "owner");
    const ownedGroupsFormatted = ownedGroups.map(({ id, name, remote }) => ({
      name: name,
      id: id,
      remote: remote,
    }));
    ownedGroupsFormatted.length === 1 &&
      setFormValues({
        ...formValues,
        group: ownedGroupsFormatted[0],
      });
    setRemoteGroup(ownedGroupsFormatted[0].remote ? true : false);
    setOwnedGroups(ownedGroupsFormatted);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    id ? editExistingEvent() : createNewEvent();
  };

  const getEventDetails = async () => {
    const res = await events.getSingleEvent(id);
    console.log(res.data);
    const parsedDateTime = parseDateTime(res.data.time);
    console.log(parsedDateTime);
    setFormValues({
      group: id,
      location: res.data.location,
      address: res.data.address,
      remote_link: res.data.remote_link,
      date: parsedDateTime.calendarDate,
      time: parsedDateTime.time24Hour,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  const createNewEvent = async () => {
    const newEvent = {
      group_id: formValues.group,
      location: formValues.location,
      address: formValues.address,
      remote_link: formValues.remote_link,
      time: `${formValues.date} ${formValues.time}`,
      user_tz: formValues.timezone,
    };
    const res = await events.createEvent(newEvent);
    navigate(`/events/${res.data.message}`);
  };

  const editExistingEvent = async () => {
    const updatedEvent = {
      group_id: formValues.group,
      location: formValues.location,
      address: formValues.address,
      remote_link: formValues.remote_link,
      time: `${formValues.date} ${formValues.time}`,
      user_tz: formValues.timezone,
    };
    const res = await events.editEvent(id, updatedEvent);
  };

  const deleteExistingEvent = async () => {
    await events.deleteEvent(id);
    navigate("/");
  };

  useEffect(() => {
    getOwnedGroups();
    id && getEventDetails();
  }, []);

  const selectedGroup = !id && formValues.group && ownedGroups.find((group) => group.id == formValues.group);

  return (
    <form id="createEventForm" onSubmit={handleOnSubmit} className="create-event__form">
      {!id && ownedGroups && ownedGroups.length > 1 && (
        <InputSelect
          name="group"
          type="text"
          label="Which group is this event for?"
          values={ownedGroups}
          onChange={handleOnChange}
          selectedValue={selectedGroup.name}
        />
      )}
      {formValues.group && (
        <div className="create-event__event-inputs">
          {!remoteGroup && (
            <>
              <InputField
                name="location"
                type="text"
                label="Location Name"
                value={formValues.location}
                onChange={handleOnChange}
              />
              <InputField
                name="address"
                type="text"
                label="Location Address"
                value={formValues.address}
                onChange={handleOnChange}
              />
            </>
          )}
          {remoteGroup && (
            <InputField
              name="remote_link"
              type="text"
              label="Event Link"
              value={formValues.remote_link}
              onChange={handleOnChange}
            />
          )}
          <div className="create-event__datetime-container">
            <div className="create-event__date-input">
              <InputField
                name="date"
                type="date"
                label="Event Date"
                placeholder="Location of event"
                value={formValues.date}
                onChange={handleOnChange}
              />
            </div>
            <div className="create-event__time-input">
              <InputField
                name="time"
                type="time"
                label="Event Time"
                placeholder="Location of event"
                value={formValues.time}
                onChange={handleOnChange}
              />
              <p className="create-event__timezone-label">Timezone: {formValues.timezone}</p>
            </div>
          </div>
          <Button type="Submit" styleType="primary" label={id ? "Update Event" : "Create Event"} />
          {id && <Button type="Button" styleType="tertiary" label="Delete Event" action={deleteExistingEvent} />}
        </div>
      )}
    </form>
  );
};

export default EventForm;
