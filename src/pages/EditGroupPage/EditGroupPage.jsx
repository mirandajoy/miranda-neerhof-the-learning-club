import GroupForm from "../../components/GroupForm/GroupForm";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./EditGroupPage.scss";

const EditGroupPage = () => {
  return (
    <PageWrapper header="Edit Group" width="small" back>
      <GroupForm />
    </PageWrapper>
  );
};

export default EditGroupPage;