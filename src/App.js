import { useEffect, useState } from "react";
import UserContext, { saveToken } from "./contexts/UserContext";
import Home from "./routes/Home/Home";
import { createBrowserHistory } from 'history';
import User from "./models/User";
import Splash from "./routes/Splash/Splash";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./routes/SignIn/SignIn";
import ZoomingIntro from "./components/ZoomingIntro/ZoomingIntro";
import SignUp from "./routes/SignUp/SignUp";
import NewVideo from "./routes/New/NewVideo/NewVideo";
import NewImage from "./routes/New/NewImage/NewImage";
import PostDetails from "./routes/PostDetails/PostDetails";

function App() {
  const [user, setUser] = useState();
  const history = createBrowserHistory();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate()

  function getToken() {
    if (user) {
      return user.token
    } else {

    }
  }

  useEffect(() => {
    let u = new User();
    setTimeout(() => {
      setUser(u);
      u.login().then((_) => {
        setUser(_);
      }).catch((e) => {
        if (e === "Token is null" && !["/signin", "/signup"].includes(window.location.pathname)) {
          navigate("/signin", { replace: true });
        } else {
          console.log(e);
        }
      }).finally(() => {
        setLoaded(true);
      })
    }, 2000);
  }, [navigate])

  return <UserContext.Provider value={{ user, setUser, saveToken, getToken }}>
    {
      <>
        <ZoomingIntro loaded={loaded}>
          <Routes>
            {user && user.token ?
              <>
                <Route path="*" element={
                  <Home history={history} />
                } />
                <Route path="/new/video" element={
                  <NewVideo />
                } />
                <Route path="/new/image" element={
                  <NewImage />
                } />
                <Route path="/p/:id" element={
                  <PostDetails />
                } />
              </> : <></>}
            <Route path="/signin" element={
              <SignIn />
            } />
            <Route path="/signup" element={
              <SignUp />
            } />
          </Routes>
        </ZoomingIntro>
        <Splash />
      </>
    }
  </UserContext.Provider>
}

export default App;