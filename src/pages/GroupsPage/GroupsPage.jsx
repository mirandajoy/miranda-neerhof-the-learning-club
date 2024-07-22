import { useEffect, useState } from "react";

import ButtonLink from "../../components/ButtonLink/ButtonLink";
import GroupListItem from "../../components/GroupListItem/GroupListItem";
import Loader from "../../components/Loader/Loader";
import { useLogin } from "../../components/LoginContextProvider/LoginContextProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import groups from "../../utils/api-groups";

import "./GroupsPage.scss";

const GroupsPage = () => {
  const [groupList, setGroupsList] = useState(null);
  const loggedIn = useLogin();

  const getGroupsList = async () => {
    const res = await groups.getGroups();
    setGroupsList(res.data);
  };

  const groupDetails = {
    name: "Group name",
    city: "Group city",
    state: "Group state",
    country: "Group country",
    remote: 0,
  };

  const createNewGroup = async () => {
    const body = groupDetails;
    const res = await groups.createGroup(body);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getGroupsList();
  }, []);

  if (groupList === null) {
    return <Loader />;
  }

  const canadaGroups = groupList.filter((group) => group.country === "Canada");
  const usaGroups = groupList.filter((group) => group.country === "United States");
  const remoteGroups = groupList.filter((group) => group.remote === 1);

  return (
    <PageWrapper header="Groups" width="small" back>
      <ButtonLink styleType="primary" label="Create Group" link="/groups/create"/>
      <div className="group-list">
        <h2 className="header header--secondary group-list__header">Groups in Canada</h2>
        {canadaGroups.map((group) => {
          return <GroupListItem key={group.id} group={group} showNextEvent showResponse />;
        })}
      </div>
      <div className="group-list group-list--usa">
        <h2 className="header header--secondary group-list__header">Groups in the USA</h2>
        {usaGroups.map((group) => {
          return <GroupListItem key={group.id} group={group} showNextEvent showResponse />;
        })}
      </div>
      <div className="group-list group-list--usa">
        <h2 className="header header--secondary group-list__header">Remote Groups</h2>
        {remoteGroups.map((group) => {
          return <GroupListItem key={group.id} group={group} showNextEvent showResponse />;
        })}
      </div>
    </PageWrapper>
  );
};

export default GroupsPage;
