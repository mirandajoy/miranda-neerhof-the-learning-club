import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import InputRadio from "../../components/InputRadio/InputRadio.jsx";
import InputSelect from "../../components/InputSelect/InputSelect";
import FormWrapper from "../FormWrapper/FormWrapper.jsx";
import groups from "../../utils/api-groups";
import locations from "../../utils/api-locations";

import "./GroupForm.scss";

const GroupForm = () => {
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
  const { id } = useParams();

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
    id ? editExistingGroup() : createNewGroup();
  };

  const getGroupDetails = async () => {
    const res = await groups.getSingleGroup(id);
    setFormValues({
      groupName: res.data.name,
      city: res.data.city,
      region_id: res.data.region_id,
      country_id: res.data.country_id,
      remote: res.data.remote,
    });
  };

  const createNewGroup = async () => {
    const res = await groups.createGroup({ ...formValues });
    setFormValues({
      groupName: "",
      city: "",
      region_id: "",
      country_id: "",
      remote: null,
    });
    navigate(`/groups/${res.data.message}`);
  };

  const editExistingGroup = async () => {
    const res = await groups.editGroup(id, { ...formValues });
    navigate(`/groups/${id}`);
  };

  const deleteExistingGroup = async () => {
    const res = await groups.deleteGroup(id);
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

  useEffect(() => {
    id && getGroupDetails();
  }, []);

  const regionValues = {
    value: regions && formValues.country_id && regions.filter((region) => region.country_id == formValues.country_id),
    label: formValues.country_id == "2" ? "State" : "Province",
    placeholder: formValues.country_id == "2" ? "Choose a state" : "Choose a province",
  };

  const selectedRegion = regions && formValues.region_id && regions.find((region) => region.id == formValues.region_id);

  return (
    <FormWrapper id="createGroupForm" onSubmit={handleOnSubmit} header={id ? "Edit Group" : "Create Group"} submitLabel={id ? "Update Group" : "Create Group"}>
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
      {countries && formValues.remote == "0" && (
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
      {regionValues && formValues.country_id && formValues.remote == "0" && (
        <>
          <InputSelect
            name="region_id"
            type="text"
            label={regionValues.label}
            values={regionValues.value}
            onChange={handleOnChange}
            placeholder={regionValues.placeholder}
            selectedValue={selectedRegion && selectedRegion.name}
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
    </FormWrapper>
  );
};

export default GroupForm;
