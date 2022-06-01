import { useEffect, useState } from "react";
import UserContext, {saveToken} from "./contexts/UserContext";
import Home from "./routes/Home/Home";
import { createBrowserHistory } from 'history';
import User from "./models/User";
import Splash from "./routes/Splash/Splash";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./routes/SignIn/SignIn";
import ZoomingIntro from "./components/ZoomingIntro/ZoomingIntro";
import SignUp from "./routes/SignUp/SignUp";

function App() {
  const [user, setUser] = useState();
  const history = createBrowserHistory();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate()

  function getToken() {
    return user.token
  }

  useEffect(() => {
    let u = new User();
    setTimeout(() => {
      setUser(u);
      u.login().then((_) => {
        console.log(1);
        setUser(_);
      }).catch((e) => {
        if (e == "Token is null" && !["/signin", "/signup"].includes(window.location.pathname)) {
          navigate("/signin", {replace: true});
        } else {
          console.log(e);
        }
      }).finally(()=>{
        setLoaded(true);
      })
    }, 2000);
  }, [])

  return <UserContext.Provider value={{ user, setUser, saveToken, getToken }}>
    {
      <>
        <ZoomingIntro loaded={loaded}>
          <Routes>
            <Route path="*" element={
              <Home history={history}/>
            } />
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