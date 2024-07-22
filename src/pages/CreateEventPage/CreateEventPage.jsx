import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertBanner from "../../components/AlertBanner/AlertBanner";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { useLogin } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import events from "../../utils/api-events";

import "./CreateEventPage.scss";

const CreateEventPage = () => {
  const [formValues, setFormValues] = useState({
    location: ""
  });
  const navigate = useNavigate();
  const login = useLogin();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOnChange = (event) => {
    const target = event.target.location;
    const newValues = {
      ...formValues,
      [target]: event.target.location,
    };
    setFormValues(newValues);
    return newValues;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    createNewEvent();
  };

  const createNewEvent = async () => {
    const res = await events.createEvent(formValues);
    console.log(res);
  };

  return (
    <PageWrapper header="Create Event" width="small">
      <form id="createEventForm" onSubmit={handleOnSubmit} className="create-event__form">
        <InputField
          name="location"
          type="text"
          label="Location"
          placeholder="Location of event"
          value={formValues.location}
          onChange={handleOnChange}
        />
        {/* {errorMessage && <AlertBanner message={errorMessage} />} */}
        <Button type="Submit" styleType="primary" label="Create Event" />
      </form>
    </PageWrapper>
  );
};

export default CreateEventPage;