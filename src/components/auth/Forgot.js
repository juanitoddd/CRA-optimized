import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { hashHistory } from 'react-router'
import { forgot } from "./Auth.duck";
import { Form, Input, Icon, Button, Alert } from "antd";
const FormItem = Form.Item;

class Forgot extends React.Component {
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {      
      if (!err) {
        this.props.forgot(values.email).then(forgot => {          
          this.setState({
            success: forgot.response.success,
            msg: forgot.response.msg
          });
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="forgot">
        <h1>Reset your password</h1>
        {this.state.msg ? (
          <Alert
            data-cy={this.state.success ? "forgot-success" : "forgot-error"}
            onClose={this.onAlertClose}
            showIcon
            message={this.state.msg}
            type={this.state.success ? "success" : "error"}
          />
        ) : null}
        <Form data-cy="forgot-form" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                placeholder="email"
                name="email"
                data-cy="email"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
            )}
          </FormItem>
          <FormItem>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Send instructions
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      forgot
    },
    dispatch
  );

const ForgotForm = Form.create({})(Forgot);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotForm);
