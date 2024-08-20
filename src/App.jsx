import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useLogin } from "./components/LoginContextProvider/LoginContextProvider";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import EditEventPage from "./pages/EditEventPage/EditEventPage";
import EditGroupPage from "./pages/EditGroupPage/EditGroupPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SingleEventPage from "./pages/SingleEventPage/SingleEventPage";
import SingleGroupPage from "./pages/SingleGroupPage/SingleGroupPage";

import "./App.scss";

const App = () => {
  const loggedIn = useLogin();
  console.log(loggedIn);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/groups" element={<GroupsPage />}></Route>
        <Route path="/groups/create" element={<CreateGroupPage />}></Route>
        <Route path="/groups/edit/:id" element={<EditGroupPage />}></Route>
        <Route path="/groups/:id" element={<SingleGroupPage />}></Route>
        <Route path="/events/create" element={<CreateEventPage />}></Route>
        <Route path="/events/edit/:id" element={<EditEventPage />}></Route>
        <Route path="/events/:id" element={<SingleEventPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
      {!loggedIn && <Footer />}
    </BrowserRouter>
  );
};

export default App;
