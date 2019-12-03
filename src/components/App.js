import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import { bindActionCreators } from "redux";
import "../styles/App.scss";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  };    

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", props);
  }

  componentDidMount() {
    console.log("componentDidMount", this.props);
  }  

  render() {
    return (
      <div>
        <h1>Website</h1>
        <Button type="primary" onClick={() => {this.props.goViewer()}}>Hey Click me</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goViewer: () => push("/viewer"),      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

