import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import InputSelect from "../../components/InputSelect/InputSelect";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import events from "../../utils/api-events";
import profiles from "../../utils/api-profile";

import "./CreateEventPage.scss";
import EventForm from "../../components/EventForm/EventForm";

const CreateEventPage = () => {

  return (
    <PageWrapper header="Create Event" width="small">
      <EventForm />
    </PageWrapper>
  );
};

export default CreateEventPage;
