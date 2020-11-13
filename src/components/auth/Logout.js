import React from "react";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { logout } from "./Auth.duck";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Clean Duck's        

    props.logout();
    props.goToHomePage();
  }

  render() {
    return false;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      goToHomePage: () => push("/")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
