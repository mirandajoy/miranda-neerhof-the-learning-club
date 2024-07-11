import { useEffect, useState } from "react";
import "./GroupsPage.scss";
import GroupListItem from "../../components/GroupListItem/GroupListItem";
import groups from "../../utils/api-groups";

const GroupsPage = () => {
  const [groupList, setGroupsList] = useState(null);

  const getGroupsList = async () => {
    const res = await groups.getGroups();
    setGroupsList(res.data);
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
