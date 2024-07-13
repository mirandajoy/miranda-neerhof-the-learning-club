import "./NotFoundPage.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!!token) {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
      <PageWrapper header="Page Not Found" size="small"></PageWrapper>
    </>
  );
};

export default NotFoundPage;
