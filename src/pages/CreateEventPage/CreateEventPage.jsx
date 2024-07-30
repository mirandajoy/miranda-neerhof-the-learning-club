import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import InputSelect from "../../components/InputSelect/InputSelect";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import events from "../../utils/api-events";
import profiles from "../../utils/api-profile";

import "./CreateEventPage.scss";

const CreateEventPage = () => {
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
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const target = event.target.name;

    const newValues = {
      ...formValues,
      [target]: event.target.value,
    };
    setFormValues(newValues);
    target === "group" && setRemoteGroup(ownedGroups.find((group) => group.id == event.target.value).remote ? true : false);
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
    createNewEvent();
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

  useEffect(() => {
    getOwnedGroups();
  }, []);

  const selectedGroup = formValues.group && ownedGroups.find((group) => group.id == formValues.group);

  return (
    <PageWrapper header="Create Event" width="small">
      <form id="createEventForm" onSubmit={handleOnSubmit} className="create-event__form">
        {ownedGroups && ownedGroups.length > 1 && (
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
            <Button type="Submit" styleType="primary" label="Create Event" />
          </div>
        )}
      </form>
    </PageWrapper>
  );
};

export default CreateEventPage;
