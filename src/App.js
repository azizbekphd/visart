import { useEffect, useState } from "react";
import UserContext from "./contexts/UserContext";
import Home from "./routes/Home/Home";
import { createBrowserHistory } from 'history';
import User from "./models/User";
import Splash from "./routes/Splash/Splash";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./routes/SignIn/SignIn";

function App() {
  const [user, setUser] = useState();
  const history = createBrowserHistory();
  const navigate = useNavigate()

  useEffect(() => {
    let u = new User();
    setUser(u);
    setTimeout(() => {
      u.login().then((_) => {
        console.log(1);
        setUser(u);
      }).catch((e) => {
        if (e == "Token is null") {
          navigate("/signin", {replace: true});
        } else {
          console.log(e);
        }
      })
    }, 2000);
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>
    {
      user ?
      <Routes>
        <Route path="*" element={
          <Home history={history}/>
        } />
        <Route path="/signin" element={
          <SignIn />
        } />
      </Routes>
      : <Splash />
    }
  </UserContext.Provider>
}

export default App;