import React from "react";
import { Route } from "react-router";
import HomeMenu from "../home/Home.menu";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Forgot from "./Forgot";
import Reset from "./Reset";
import Invitation from "./Invitation";
import Confirm from "./Confirm";
import VerifyEmail from "./VerifyEmail";
import "./Auth.scss";

const AuthContainer = ({ match }) => (
  <div>
    <header>
      <HomeMenu />
    </header>
    <div className="bg">
      <div className="stripe" />
      {/* <div className="stripe2" /> */}
    </div>
    <div className="content" style={{ width: "400px", margin: "auto" }}>
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/confirm" component={Confirm} />
      <Route exact path="/forgot" component={Forgot} />
      <Route exact path="/reset/:token" component={Reset} />
      <Route exact path="/invitation/:token" component={Invitation} />
      <Route exact path="/verifyEmail/:token" component={VerifyEmail} />
    </div>
  </div>
);

export default AuthContainer;
