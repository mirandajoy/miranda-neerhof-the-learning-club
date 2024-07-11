import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import profiles from './utils/api-profile';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!!token) {
      setLoggedIn(true);
      getUserProfile();
    }
  }, [token]);

  const getUserProfile = async () => {
    const res = await profiles.getProfile();
    setUserProfile(res.data.name);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setLoggedIn(false);
    setUserProfile(null);
  };

  return (
    <>
      <BrowserRouter>
        <Header loggedIn={loggedIn} userProfile={userProfile} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage loggedIn={loggedIn} userProfile={userProfile} />}></Route>
          <Route path="/groups" element={<GroupsPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
