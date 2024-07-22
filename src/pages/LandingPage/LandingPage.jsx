import "./LandingPage.scss";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

const LandingPage = () => {
  return (
    <main>
      <section className="hero">
        <div className="hero__img">
          <div className="hero__img-overlay"></div>
        </div>
        <div className="hero__outer-content-container">
          <div className="hero__content-container">
            <h1 className="hero__header">The Learning Club</h1>
            <h2 className="hero__subheader">Connecting curious people together</h2>
            <div className="hero__cta-container">
              <ButtonLink link="/#details" label="Discover More" styleType="secondary" anchor />
            </div>
          </div>
        </div>
      </section>

      <section id="details" className="details">
        <div className="details__inner-container">
          <h2 className="header header--primary details__header">How it works</h2>
          <div className="details__card-container">
            <div className="details__card">
              <div className="details__highlight details__highlight--green"></div>
              <div className="details__card-content">
                <h2 className="header header--secondary">
                  <span className="body details__number">1.</span> Find a group
                </h2>
                <p className="body body-dark">Choose from groups that are local or remote.</p>
              </div>
            </div>
            <div className="details__card">
              <div className="details__highlight details__highlight--pink"></div>
              <div className="details__card-content">
                <h2 className="header header--secondary">
                  <span className="body details__number">2.</span> Learn a Topic
                </h2>
                <p className="body body-dark">There's a new topic every month.</p>
              </div>
            </div>
            <div className="details__card">
              <div className="details__highlight details__highlight--blue"></div>
              <div className="details__card-content">
                <h2 className="header header--secondary">
                  <span className="body details__number">3.</span> Meet up
                </h2>
                <p className="body body-dark">Hang out and chat about what you learned!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="groups-section">
        <div className="groups-section__curve-divider">
          <svg
            className="groups-section__curve-shape"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="groups-section__curve-fill"
            ></path>
          </svg>
        </div>
        <div className="groups-section__content">
          <h2 className="header groups-section__header">Find a Group to Join</h2>
          <div className="groups-section__button">
            <ButtonLink link="/groups" label="Browse Groups" styleType="secondary" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
