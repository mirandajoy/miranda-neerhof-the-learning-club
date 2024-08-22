import "./LandingPage.scss";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import curveBgLight from "../../assets/images/curve-bg-light.svg";
import learnIcon from "../../assets/images/learn.svg";
import connectIcon from "../../assets/images/connect.svg";
import curveLine from "../../assets/images/curve-line.svg";
import curvesLayered from "../../assets/images/curves-layered.svg";

const LandingPage = () => {
  return (
    <main>
      <section className="hero">
        <div className="hero__wrapper">
          <div className="hero__img">
            <div className="hero__img-overlay">
              <h4 className="hero__img-tagline">
                August Theme<span className="hero__img-tagline--divider"> | </span>Puffins
              </h4>
            </div>
          </div>
          <div className="hero__outer-content-container">
            <div className="hero__content-container">
              <h1 className="hero__header">The Learning Club</h1>
              <h2 className="hero__subheader">Connecting curious people together</h2>
              <div className="hero__cta-container">
                <ButtonLink link="/signup" label="Join Now" styleType="primary" anchor size="full-width" />
                <ButtonLink link="/#details" label="Discover More" styleType="secondary" anchor size="full-width" />
              </div>
            </div>
          </div>
        </div>
        <img src={curveBgLight} className="hero__divider-curve" alt=""/>
      </section>

      <section id="details" className="details">
        <div className="details__wrapper">
          <div className="details__card">
            <img src={learnIcon} className="details__icon" alt=""/>
            <h3 className="details__header">Learn</h3>
            <p className="details__body">From Puffins to black holes, the club will provide a new topic each month.</p>
            <p className="details__body">
              Therer will be a featured podcast or video for everyone to learn from and discuss.
            </p>
            <p className="details__body">Additional resources will be provided for your learning enjoyment!</p>
          </div>
          <div className="details__card">
            <img src={connectIcon} className="details__icon" alt=""/>
            <h3 className="details__header">Meet</h3>
            <p className="details__body">Choose a local group or meet online.</p>
            <p className="details__body">If there are no groups available you can start your own. </p>
            <p className="details__body">
              Then meet up with your group, discuss the new things you’ve learned, and, most importantly, make new
              friends.
            </p>
          </div>
        </div>
      </section>

      <section className="groups-section">
        <img src={curveLine} className="groups-section__divider" alt="" />
        <div className="groups-section__content">
          <h2 className="groups-section__header">Join the Club and Start Learning!</h2>
          <div className="groups-section__buttons">
            <ButtonLink link="/signup" label="Sign Up" styleType="primary" size="min-width-lg" />
            <ButtonLink link="/groups" label="Browse Groups" styleType="secondary" size="min-width-lg" />
          </div>
        </div>
        <img src={curvesLayered} className="groups-section__decorative-curves" alt="" />
      </section>
    </main>
  );
};

export default LandingPage;
