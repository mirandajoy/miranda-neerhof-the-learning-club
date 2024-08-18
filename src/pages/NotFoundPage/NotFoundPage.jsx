import "./NotFoundPage.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

const NotFoundPage = () => {
  return (
    <PageWrapper header="Page Not Found" width="medium">
      <div className="not-found">
        <p className="body body--black not-found__body">The page you're looking for does not exist.</p>
        <div className="not-found__btn">
          <ButtonLink label="Return to Home" styleType="primary" link="/" size="default" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
