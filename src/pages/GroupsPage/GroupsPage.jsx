import { useEffect, useState } from "react";
import "./GroupsPage.scss";
import { getGroups } from "../../utils/api-utils";
import axios from "axios";
import GroupListItem from "../../components/GroupListItem/GroupListItem";

const GroupsPage = () => {
  const [groupList, setGroupsList] = useState(null);

  const getGroupsList = async () => {
    try {
      const res = await axios.get(getGroups());
      console.log(res.data);
      setGroupsList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGroupsList();
  }, []);

  if(groupList === null) {
    return ("Loading...")
  }

  return (
    <main className="group-list">
      <h1 className="header header--primary group-list__header">Groups</h1>
      {groupList.map((group) => {
        return (<GroupListItem key={group.id} city={group.city} state={group.state} country={group.country} />);
      })}
    </main>
  );
};

export default GroupsPage;
