import React from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { verifyEmail } from "./Auth.duck";
import { Alert, Spin, Icon } from "antd";

const Title = styled.h1`
  color: ${props => props.theme.fg};
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      success: null
    };
    // console.log("constructor --->");
  }

  componentWillMount() {
    const _token = this.props.match.params.token;
    this.props.verifyEmail(_token).then(verify => {
      this.setState({ success: verify.response.success, loading: false });
      console.log("response component -->", verify);
    });
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {
    this.setState({ loading: props.auth.loading });
  }

  render() {
    let alert = null;
    if (this.state.success !== null) {
      if (this.state.success) {
        // TODO: Fill description
        alert = (
          <Alert data-cy="welcome" message="Welcome" description="" type="success" showIcon />
        );
      } else {
        alert = (
          <Alert
            message="Error"
            description={this.props.auth.message}
            type="error"
            showIcon
          />
        );
      }
    }
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
      <div>
        <Title>Verifying Email</Title>
        {this.state.loading ? (
          <div>
            <Spin indicator={antIcon} spinning={true} /> {" "} Verifing your account
          </div>
        ) : null}
        {alert}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      verifyEmail
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmail);
