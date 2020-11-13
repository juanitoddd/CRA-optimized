import React from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./Auth.duck";
import { message, Form, Checkbox, Icon, Input, Button, Alert } from "antd";
const FormItem = Form.Item;

const LinkInline = styled(Link)`
  display: inline-block !important;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      success: null,
      submited: false,
      msg: null
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {}

  handleSubmit = e => {
    this.setState({ loading: true });
    e.preventDefault();
    this.props.form.validateFields((_err, _values) => {
      this.props.login(_values).then(login => {
        if (login.response.success) {
          this.setState({
            loading: false,
            success: login.response.success,
            submited: true,
            msg: null
          });
          // LogRocket                    
          /*       
          const _user = login.response.data.user.User;   
          window.LogRocket.identify(_user.id , {
            name: _user.username,
            email: _user.email,        
            // Add your own custom user variables here, ie:
            // TODO: subscriptionType: 'pro'
          });
          */          
          // And then go home
          this.props.goHome();
          message.success("welcome");
        } else {
          this.setState({
            loading: false,
            msg: login.response.msg,
            submited: true,
            success: login.response.success
          });
          message.error(login.response.msg);
        }
      });
    });
  };

  onAlertClose = e => {
    this.setState({ msg: null, submited: false, success: false });
  };

  checkUsername(rule, value, callback) {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div id="login">
        <h1>Login</h1>
        {this.state.msg ? (
          <Alert
            data-cy="login-error"
            closable
            onClose={this.onAlertClose}
            showIcon
            message={this.state.msg}
            type="error"
            description={
              <React.Fragment>
                {/*<Link to="/forgot">Trouble logging in ?</Link>*/}
              </React.Fragment>
            }
          />
        ) : null}
        <Form data-cy="login-form" id="loginForm" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={
              this.state.submited
                ? this.state.success
                  ? "success"
                  : "error"
                : "validating"
            }
            className="loginFormUsername"
          >
            {getFieldDecorator("User.username", {
              rules: [
                { required: true, message: "Username or email is required" }
                // { validator: this.checkName },
                // { pattern: regExpConfig.IDcardTrim, message: '' }
              ]
              // validateTrigger: 'onBlur'
            })(
              <Input
                type="text"
                name="username"
                label="Username"
                data-cy="username"
                placeholder="Username or email"
                prefix={
                  <Icon name="user" type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }                
              />
            )}
          </FormItem>
          <FormItem
            validateStatus={
              this.state.submited
                ? this.state.success
                  ? "success"
                  : "error"
                : "validating"
            }
            className="loginFormPassword"
          >
            {getFieldDecorator("User.password", {
              rules: [{ required: true, message: "Password is required" }]
              // validateTrigger: 'onBlur'
            })(
              <Input
                type="password"
                name="password"
                label="Password"
                data-cy="password"
                placeholder="Password"
                prefix={
                  <Icon name="password" type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }                
              />
            )}
          </FormItem>
          <FormItem>
            {/*
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}    
            */}
            <Link style={{ display: "block", marginBottom: 15 }} to="/forgot">
              Trouble logging in ?
            </Link>
            <Button
              id="loginFormSubmit"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              Log in
            </Button>
            Need an account ? <LinkInline to="/signup">register now!</LinkInline>
          </FormItem>
        </Form>
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
      login,
      goHome: () => push("/dashboard")
    },
    dispatch
  );

const LoginForm = Form.create({})(Login);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
