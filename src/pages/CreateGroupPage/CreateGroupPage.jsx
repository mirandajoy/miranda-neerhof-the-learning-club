import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertBanner from "../../components/AlertBanner/AlertBanner";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import InputRadio from "../../components/InputRadio/InputRadio.jsx";
import InputSelect from "../../components/InputSelect/InputSelect";
import { useLogin } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import groups from "../../utils/api-groups";
import { provinces, states } from "../../utils/location-options.js";

import "./CreateGroupPage.scss";

const CreateGroupPage = () => {
  const [formValues, setFormValues] = useState({
    groupName: "",
    city: "",
    state: "",
    country: "",
    remote: null,
  });
  const navigate = useNavigate();
  const login = useLogin();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOnChange = (event) => {
    const target = event.target.name;
    const newValues = {
      ...formValues,
      [target]: event.target.value,
    };
    setFormValues(newValues);
    return newValues;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    createNewGroup();
  };

  const createNewGroup = async () => {
    const res = await groups.createGroup({ ...formValues, remote: 0 });
    setFormValues({
      groupName: "",
      city: "",
      state: "",
      country: "",
      remote: null,
    });
    navigate(`/groups/${res.data.message}`);
  };

  const meetingType = [
    {
      name: "in-person",
      value: 0,
      label: "In Person",
    },
    {
      name: "remote",
      value: 1,
      label: "Remote",
    },
  ];

  const countries = [
    {
      name: "us",
      value: "Canada",
      label: "Canada",
    },
    {
      name: "us",
      value: "United States",
      label: "United States",
    },
  ];

  const stateValues = {
    value: formValues.country === "United States" ? states : provinces,
    label: formValues.country === "United States" ? "State" : "Province",
    placeholder: formValues.country === "United States" ? "Choose a state" : "Choose a province",
  };

  return (
    <PageWrapper header="Create Group" width="small">
      <form id="createGroupForm" onSubmit={handleOnSubmit} className="create-group__form">
        <InputField
          name="groupName"
          type="text"
          label="What is the name of your group?"
          placeholder="Group Name"
          value={formValues.groupName}
          onChange={handleOnChange}
        />
        <InputRadio label="How would you like to meet?" name="remote" values={meetingType} onChange={handleOnChange} checkedValue={formValues.remote}/>
        {formValues.remote === "0" && (
          <>
            <InputRadio label="Country" name="country" values={countries} onChange={handleOnChange} checkedValue={formValues.country}/>
          </>
        )}
        {formValues.country && (
          <>
            <InputSelect
              name="state"
              type="text"
              label={stateValues.label}
              values={stateValues.value}
              onChange={handleOnChange}
              placeholder={stateValues.placeholder}
              selectedValue={formValues.state}
            />
            <InputField
              name="city"
              type="text"
              label="City"
              placeholder="City"
              value={formValues.city}
              onChange={handleOnChange}
            />
          </>
        )}
        {/* {errorMessage && <AlertBanner message={errorMessage} />} */}
        <Button type="Submit" styleType="primary" label="Create Group" />
      </form>
    </PageWrapper>
  );
};

export default CreateGroupPage;
