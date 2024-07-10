import { useEffect, useState } from "react";
import "./GroupsPage.scss";
import { getGroups, joinGroup } from "../../utils/api-utils";
import axios from "axios";
import GroupListItem from "../../components/GroupListItem/GroupListItem";

const GroupsPage = () => {
  const [groupList, setGroupsList] = useState(null);

  const getGroupsList = async () => {
    const token = sessionStorage.getItem("JWTtoken");

    try {
      console.log(!!token);
      if (!!token) {
        console.log("test");
        const resAuth = await axios.get(getGroups(), {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setGroupsList(resAuth.data);
      } else {
        const res = await axios.get(getGroups());
        setGroupsList(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGroupsList();
  }, []);

  if (groupList === null) {
    return "Loading...";
  }

  return (
    <main className="group-list">
      <h1 className="header header--primary group-list__header">Groups</h1>
      {groupList.map((group) => {
        return <GroupListItem key={group.id} group={group} />;
      })}
    </main>
  );
};

export default GroupsPage;
