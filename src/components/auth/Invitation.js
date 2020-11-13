import React from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import { hashHistory } from 'react-router'
import { getInviteFromToken, acceptInvitation } from "./Auth.duck";
import { Form, Input, Button, Icon, Alert } from "antd";
const FormItem = Form.Item;

class Invitation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invite: null,
      valid: false,
      submited: false,
      success: null,
      msg: null
    };
  }

  componentWillMount() {
    if (this.props.match.params.token) {
      // 1. Validate Token
      this.props
        .getInviteFromToken(this.props.match.params.token)
        .then(invite => {
          if (invite.response.success) {
            this.setState({ valid: true, invite: invite.response.data });
            this.props.form.setFieldsValue({
              email: invite.response.data.email
            });
          } else {
            this.setState({ msg: invite.response.msg });
            setTimeout(() => {
              console.log("Redirecting");
              this.props.goHome();
            }, 2000);
          }
        });
    } else {
      this.props.goHome();
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("err", err);
      console.log("values", values);
      if (!err) {
        const _token = this.props.match.params.token;         
        this.props
          .acceptInvitation(values, _token)
          .then(result => {            
            this.setState({
              msg: result.response.msg,
              success: result.response.success,
              submited: true
            });            
        });      
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter are inconsistent!");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="reset">
        {this.state.valid ? (
          <React.Fragment>
            <h1>Complete your registration</h1>
            {this.state.msg ? (
              <Alert
                onClose={this.onAlertClose}
                showIcon
                message={this.state.msg}
                type={this.state.success ? "success" : "error"}
              />
            ) : null}
            {this.state.submited && this.state.success ? (
              <Button type="primary" onClick={this.props.goToLogin}>
                Login now
              </Button>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <FormItem label="Email">
                  {getFieldDecorator("email")(<Input type="email" disabled />)}
                </FormItem>
                <FormItem label="Username">
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your username!"
                      }                      
                    ]
                  })(<Input/>)}
                </FormItem>
                <FormItem label="Password">
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      },
                      {
                        min: 6,
                        message: "Password should be minimun 6 charachters"
                      },
                      {
                        validator: this.checkConfirm
                      }
                    ]
                  })(<Input type="password" />)}
                </FormItem>
                <FormItem label="Confirm Password">
                  {getFieldDecorator("confirm", {
                    rules: [
                      {
                        required: true,
                        message: "Please confirm your password!"
                      },
                      {
                        validator: this.checkPassword
                      }
                    ]
                  })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                </FormItem>
                <FormItem style={{ marginTop: 20 }}>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Set Account
                  </Button>
                </FormItem>
              </Form>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ textAlign: "center", marginTop: 15 }}>
              {this.state.msg ? (
                <div>
                  <Alert
                    message="Error"
                    description={`${this.state.msg}. Redirecting...`}
                    type="error"
                    showIcon
                  />
                </div>
              ) : (
                <div>
                  <h1>Validating...</h1>
                  <Icon type="loading" style={{ fontSize: 42 }} />
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInviteFromToken,
      acceptInvitation,
      goToLogin: () => push("/login"),
      goHome: () => push("/")
    },
    dispatch
  );

const InvitationForm = Form.create({})(Invitation);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationForm);
