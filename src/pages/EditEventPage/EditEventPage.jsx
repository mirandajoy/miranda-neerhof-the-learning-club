import EventForm from "../../components/EventForm/EventForm";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./EditEventPage.scss";

const EditEventPage = () => {
  return (
    <PageWrapper width="small" back>
      <EventForm />
    </PageWrapper>
  );
};

export default EditEventPage;
