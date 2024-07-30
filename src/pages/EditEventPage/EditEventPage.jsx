import EventForm from "../../components/EventForm/EventForm";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./EditEventPage.scss";

const EditEventPage = () => {
  return (
    <PageWrapper header="Edit Event" width="small">
      <EventForm />
    </PageWrapper>
  );
};

export default EditEventPage;
