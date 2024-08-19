import { useEffect, useState } from "react";

import ButtonLink from "../../components/ButtonLink/ButtonLink";
import GroupListItem from "../../components/GroupListItem/GroupListItem";
import Loader from "../../components/Loader/Loader";
import { useLogin } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import groups from "../../utils/api-groups";
import locations from "../../utils/api-locations";

import InputRadio from "../../components/InputRadio/InputRadio";
import InputSelect from "../../components/InputSelect/InputSelect";
import "./GroupsPage.scss";

const GroupsPage = () => {
  const [groupList, setGroupsList] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regions, setRegions] = useState("");
  const loggedIn = useLogin();

  const getGroupsList = async () => {
    const res = await groups.getGroups();
    setGroupsList(res.data);
  };

  const getLocations = async () => {
    const regions = await locations.getRegions();
    const modifiedRegions = regions.data.map(({ region_name, ...rest }) => ({
      name: region_name,
      ...rest,
    }));
    setRegions(modifiedRegions);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getGroupsList();
    getLocations();
  }, []);

  if (groupList === null) {
    return <Loader />;
  }

  const handleLocationSelect = (e) => {
    setSelectedRegion(null);
    setSelectedLocation(e.target.value);
  };

  const filteredGroups =
    selectedLocation &&
    selectedRegion &&
    groupList.filter((group) => group.country_id == selectedLocation && group.region_id == selectedRegion);

  const remoteGroups = groupList && groupList.filter((group) => group.remote === 1);

  const locationOptions = [
    {
      id: 1,
      name: "Canada",
    },
    {
      id: 2,
      name: "USA",
    },
    {
      id: 3,
      name: "Remote",
    },
  ];

  const regionValues = {
    value: regions && selectedLocation && regions.filter((region) => region.country_id == selectedLocation),
    placeholder: selectedLocation == 2 ? "Choose a state" : "Choose a province",
  };

  let listRendered;
  if (!!selectedLocation && !!selectedRegion) {
    listRendered = true;
  } else if (!!selectedLocation && selectedLocation == 3) {
    listRendered = true;
  } else {
    listRendered = false;
  }

  return (
    <>
      <PageWrapper header="Groups" width="medium" back>
        <div className="group-page__filters">
          <div className="group-page__location-select">
            <InputRadio
              name="location"
              values={locationOptions}
              onChange={handleLocationSelect}
              checkedValue={selectedLocation}
            />
          </div>
          {regionValues && selectedLocation && selectedLocation != 3 && (
            <div className="group-page__region-select">
              <InputSelect
                name="region"
                values={regionValues.value}
                onChange={(e) => setSelectedRegion(e.target.value)}
                placeholder={regionValues.placeholder}
                selectedValue={selectedRegion ? selectedRegion.name : ""}
              />
            </div>
          )}
        </div>
        {listRendered && (
          <div className="group-page__list">
            {selectedRegion &&
              filteredGroups &&
              filteredGroups.map((group) => {
                return <GroupListItem key={group.id} group={group} showNextEvent showResponse />;
              })}
            {selectedLocation == 3 &&
              remoteGroups.map((group) => {
                return <GroupListItem key={group.id} group={group} showNextEvent showResponse />;
              })}
          </div>
        )}
        <section className="group-page__prompt">
          {listRendered ? (
            <>
              <h3 className="header header--3">Don’t see what you're looking for?</h3>
              {loggedIn ? (
                <ButtonLink styleType="primary" label="Launch a Group" link="/groups/create" size="default" />
              ) : (
                <ButtonLink styleType="primary" label="Sign Up & Launch a Group" link="/signup" size="default" />
              )}
            </>
          ) : (
            <>
              <h3 className="header header--3">Select a location</h3>
              <p className="body">Select a location to see local groups or remote to see online groups.</p>
            </>
          )}
        </section>
      </PageWrapper>
    </>
  );
};

export default GroupsPage;
