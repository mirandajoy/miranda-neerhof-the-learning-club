import "./HomePage.scss";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

const HomePage = ({ loggedIn, userProfile }) => {
  if (!loggedIn) {
    return (
      <main className="home">
        <h1 className="header header--primary home__header">Landing Page</h1>
        <div className="home__button">
          <ButtonLink link="/signup" label="Sign Up" />
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      <h1 className="header header--primary home__header">Learning Materials</h1>
      <h2>Hi, {userProfile}</h2>
    </main>
  );
};

export default HomePage;
