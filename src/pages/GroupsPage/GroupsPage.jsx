import { useEffect } from "react";
import "./GroupsPage.scss";
import { getGroups } from "../../utils/api-utils";
import axios from "axios";

const GroupsPage = () => {
  const getGroupsList = async () => {
    try {
      const res = await axios.get(getGroups());
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGroupsList();
  }, []);

  return (
    <>
      <h1 className="header header--primary">Groups</h1>
    </>
  );
};

export default GroupsPage;
