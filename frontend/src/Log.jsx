import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import Singin from "./Routes/Singin";
import Welcome from "./Routes/Welcome.jsx";

export default function Log(props) {
  const [display, setDisplay] = useState("show welcome");
  const [display2, setDisplay2] = useState("hide");
  setTimeout(() => {
    setDisplay("hide welcome");
    setDisplay2("show");
  }, 10000);
  return (
    <>
      <Welcome disp={display} setDisplay = {setDisplay} setDisplay2={setDisplay2}/>
      <header className={display2}>
        <nav>
          <NavLink to="*">Log in</NavLink>
          <NavLink to="Singin">Sign up</NavLink>
        </nav>
      </header>
      <main className={display2}>
        <Routes>
          <Route
            path="*"
            element={
              <Login
                userProfPic={props.userProfPic}
                setUserProfPic={props.setUserProfPic}
                setUser={props.setUser}
                setToken={props.setToken}
              />
            }
          />
          <Route
            path="Singin"
            element={
              <Singin
                userProfPic={props.userProfPic}
                setUser={props.setUser}
                setToken={props.setToken}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}
