import { createContext, useContext, useEffect, useState } from "react";

const LoginContext = createContext();
const UpdateLoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export function useLoginUpdate() {
  return useContext(UpdateLoginContext);
}

const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  function updateLogin(state) {
    if (state === false) {
      sessionStorage.removeItem("JWTtoken");
    }
    setLoggedIn(state);
  }

  const checkLogin = () => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!!token) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <LoginContext.Provider value={loggedIn}>
      <UpdateLoginContext.Provider value={updateLogin}>{children}</UpdateLoginContext.Provider>
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
