import { useEffect, useState } from "react";
import GroupListItem from "../../components/GroupListItem/GroupListItem";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import groups from "../../utils/api-groups";
import "./GroupsPage.scss";

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
    <PageWrapper header="Groups" width="small">
      <ul className="group-list">
        {groupList.map((group) => {
          return <GroupListItem key={group.id} group={group} />;
        })}
      </ul>
    </PageWrapper>
  );
};

export default GroupsPage;
