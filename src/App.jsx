import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SingleEventPage from "./pages/SingleEventPage/SingleEventPage";
import SingleGroupPage from "./pages/SingleGroupPage/SingleGroupPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/groups" element={<GroupsPage />}></Route>
          <Route path="/groups/:id" element={<SingleGroupPage />}></Route>
          <Route path="/events/:id" element={<SingleEventPage />}></Route>
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
