import React from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { signup } from "./Auth.duck";
import { serialize } from "@utils/serialize";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
  message
} from "antd";

const FormItem = Form.Item;

const Title = styled.h1`
  color: ${props => props.theme.fg};
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };    
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== "test") {
      this.renderReCaptcha();      
    }
  }

  renderReCaptcha = () => {    
    // console.log("Trying to render ReCaptcha");
    if(window.env !== "staging") {
      if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
        window.grecaptcha.render("signupFormRecaptcha", {
          sitekey: "6LcXP4sUAAAAADAqc8d5SJ9-0YJmo0vodUysXctv"
        });
      } else {          
        setTimeout(() => {
          this.renderReCaptcha();
        }, 200);            
      }
    }    
  };

  componentWillReceiveProps(props) {}

  handleSubmit = e => {
    e.preventDefault();    
    this.props.form.validateFieldsAndScroll((_err, _values) => {
      if (!_err) {
        message.loading("Signing up ...");
        const values = _values;
        // Get reCaptcha value
        const _form = serialize(e.target);
        values.recaptcha = window.env !== "staging" ? _form["g-recaptcha-response"] : 1;
        this.props.signup(values).then(signup => {
          if (signup.response.success) {
            message.success("Success");
            this.props.goNext();
          } else {
            message.error(signup.response.msg);
            console.log("msg", signup.response.msg);
          }
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
    if (value && value !== form.getFieldValue("User.password")) {
      callback("Two passwords that you enter are inconsistent!");
    } else {
      callback();
    }
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <div>
        <h1>Sign up</h1>
        <Form id="signupForm" data-cy="signup-form" onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                Organization&nbsp;
                <Tooltip title="Company or Organization name">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("Account.name")(<Input data-cy="account" name="account" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                Username&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("User.username", {
              rules: [
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true
                }
              ]
            })(<Input data-cy="username" name="username" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator("User.email", {
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
            })(<Input data-cy="email" name="email" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator("User.password", {
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
            })(<Input data-cy="password" name="password" type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password">
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
            })(<Input data-cy="password-confirm" name="password-confirm" type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Row gutter={8}>
              <Col span={24}>
                <div id="signupFormRecaptcha" />
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              rules: [
                {
                  required: true,
                  message: "Agree to the terms and conditions"
                }
              ],
              valuePropName: "checked"
            })(
              <Checkbox data-cy="terms" name="terms" className="signupTerms">
                I have read the <a href="">agreement</a>
              </Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              id="signupFormSubmit"
              type="primary"
              name="submit"
              data-cy="submit"
              htmlType="submit"
              loading={this.props.auth.loading}
            >
              Sign Up
            </Button>
          </FormItem>
          {alert}
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
      signup,
      goNext: () => push("/confirm")
    },
    dispatch
  );

const SignupForm = Form.create()(Signup);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
