import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import GroupListItem from "../../components/GroupListItem/GroupListItem";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import groups from "../../utils/api-groups";
import "./GroupsPage.scss";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const GroupsPage = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [groupList, setGroupsList] = useState(null);
  const navigate = useNavigate();

  const getGroupsList = async () => {
    const res = await groups.getGroups();
    setGroupsList(res.data);
    
  };

  const checkLogin = () => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!!token) {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    checkLogin();
    getGroupsList();
  }, []);

  if (groupList === null) {
    return "Loading...";
  }

  const canadaGroups = groupList.filter((group) => group.country === "Canada");
  const usaGroups = groupList.filter((group) => group.country === "United States");
  const remoteGroups = groupList.filter((group) => group.remote === 1);

  return (
    <>
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
      <PageWrapper header="Groups" width="small" back="/">
        <div className="group-list">
          <h2 className="header header--secondary group-list__header">Groups in Canada</h2>
          {canadaGroups.map((group) => {
            return <GroupListItem key={group.id} group={group} loggedIn={loggedIn} />;
          })}
        </div>
        <div className="group-list group-list--usa">
          <h2 className="header header--secondary group-list__header">Groups in the USA</h2>
          {usaGroups.map((group) => {
            return <GroupListItem key={group.id} group={group} loggedIn={loggedIn} />;
          })}
        </div>
        <div className="group-list group-list--usa">
          <h2 className="header header--secondary group-list__header">Remote Groups</h2>
          {remoteGroups.map((group) => {
            return <GroupListItem key={group.id} group={group} loggedIn={loggedIn} />;
          })}
        </div>
      </PageWrapper>
    </>
  );
};

export default GroupsPage;
