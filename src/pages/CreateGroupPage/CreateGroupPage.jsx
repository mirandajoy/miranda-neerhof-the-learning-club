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
import locations from "../../utils/api-locations";
import { provinces, states } from "../../utils/location-options.js";
import axios from "axios";

import "./CreateGroupPage.scss";

const CreateGroupPage = () => {
  const [formValues, setFormValues] = useState({
    groupName: "",
    city: "",
    region_id: "",
    country_id: "",
    remote: null,
  });
  const [countries, setCountries] = useState(null);
  const [regions, setRegions] = useState("");
  const navigate = useNavigate();
  const login = useLogin();
  const [errorMessage, setErrorMessage] = useState(null);

  const getLocations = async () => {
    const countries = await locations.getCountries();
    const regions = await locations.getRegions();
    const modifiedCountries = countries.data.map(({ country_name, ...rest }) => ({
      name: country_name,
      ...rest,
    }));
    const modifiedRegions = regions.data.map(({ region_name, ...rest }) => ({
      name: region_name,
      ...rest,
    }));
    setCountries(modifiedCountries);
    setRegions(modifiedRegions);
  };

  useEffect(() => {
    getLocations();
  }, []);

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
    const res = await groups.createGroup({ ...formValues});
    setFormValues({
      groupName: "",
      city: null,
      region_id: null,
      country_id: null,
      remote: null,
    });
    navigate(`/groups/${res.data.message}`);
  };

  const meetingType = [
    {
      id: 0,
      name: "In Person",
    },
    {
      id: 1,
      name: "Remote",
    },
  ];

  const regionValues = {
    value: regions && formValues.country_id && regions.filter((region) => region.country_id == formValues.country_id),
    label: formValues.country_id == "2" ? "State" : "Province",
    placeholder: formValues.country_id == "2" ? "Choose a state" : "Choose a province",
  };

  const selectedRegion = formValues.region_id && regions.find((region) => region.id == formValues.region_id);

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
        <InputRadio
          label="How would you like to meet?"
          name="remote"
          values={meetingType}
          onChange={handleOnChange}
          checkedValue={formValues.remote}
        />
        {formValues.remote === "0" && (
          <>
            <InputRadio
              name="country_id"
              label="Country"
              values={countries}
              onChange={handleOnChange}
              checkedValue={formValues.country_id}
            />
          </>
        )}
        {formValues.country_id && (
          <>
            <InputSelect
              name="region_id"
              type="text"
              label={regionValues.label}
              values={regionValues.value}
              onChange={handleOnChange}
              placeholder={regionValues.placeholder}
              selectedValue={selectedRegion.name}
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
