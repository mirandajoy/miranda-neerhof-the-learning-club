import GroupForm from "../../components/GroupForm/GroupForm.jsx";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./CreateGroupPage.scss";

const CreateGroupPage = () => {
  return (
    <PageWrapper header="Create Group" width="small">
      <GroupForm />
    </PageWrapper>
  );
};

export default CreateGroupPage;
