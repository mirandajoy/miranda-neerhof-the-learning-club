import "./LearningFeature.scss";
import puffinCover from "../../assets/images/puffin-cover.jpg";

const LearningFeature = () => {
  return (
    <div className="resources">
      <img src={puffinCover} className="resources__cover-img" alt="image of a puffin perched in grass" />
      <div className="resources__content-container">
        <div>
          <h2 className="header header--3 resources__feature">Feature Podcast: Puffinology</h2>
          <p className="body body--dark resources__author">Sourced from: Ologies</p>
        </div>
        <div>
          <h3 className="header header--4 resources__listen-header">Listen On</h3>
          <div className="resources__links-container">
            <a
              href="https://podcasts.apple.com/us/podcast/puffinology-puffins-with-jill-taylor/id1278815517?i=1000660402277"
              target="_blank"
              className="resources__link-wrapper"
            >
              <span className="material-symbols-outlined">headphones</span>
              <span className="body">Apple</span>
            </a>
            <a
              href="https://open.spotify.com/episode/3AoyEluAL01VhzAj05ZYms"
              target="_blank"
              className="resources__link-wrapper"
            >
              <span className="material-symbols-outlined">headphones</span>
              <span className="body resources__link">Spotify</span>
            </a>
          </div>
        </div>
        <div className="additional-resources">
          <h3 className="header header--4 additional-resources__header">Learn More About Puffins!</h3>
          <div className="additional-resources__x-link-container">
            <span className="material-symbols-outlined">article</span>
            <a href="https://www.youtube.com/watch?v=EIUJfXk3_3w" target="_blank" className="link">
              Know your Puffins
            </a>
          </div>
          <div className="additional-resources__x-link-container">
            <span className="material-symbols-outlined">videocam</span>
            <a href="https://www.youtube.com/watch?v=EIUJfXk3_3w" target="_blank" className="link">
              Puffin Hunts Fish To Feed Puffling
            </a>
          </div>
          <div className="additional-resources__x-link-container">
            <span className="material-symbols-outlined">videocam</span>
            <a href="https://www.youtube.com/watch?v=EIUJfXk3_3w" target="_blank" className="link">
              How The Adorable Atlantic Puffin Came Back From Near Extinction
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningFeature;
