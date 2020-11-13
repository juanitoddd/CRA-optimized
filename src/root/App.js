import React, { lazy } from "react";
import { Route, Switch } from "react-router";
// import ReactGA from 'react-ga';
import '@styles/App.scss';
import '@styles/antd.overrides.scss';

// Containers
const Home = lazy(() => import('@components/home/Home'));
const Module = lazy(() => import('@components/module/Module'));
const Auth = lazy(() => import('@auth'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Set window env variable
    switch (window.location.host) {
      case "metasite.io":
        window.env = "production"
        break;
      case "metasite.cc":
        window.env = "staging"
        break;
      default:
        window.env = "development"
    }
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/module" component={Module} />

          {/*
          <Route exact path="/login" component={Auth} />
          <Route exact path="/logout" component={Auth} />
          <Route exact path="/signup" component={Auth} />
          <Route exact path="/confirm" component={Auth} />
          <Route exact path="/forgot" component={Auth} />
          <Route exact path="/invitation/:token" component={Auth} />
          <Route exact path="/reset/:token" component={Auth} />
          <Route exact path="/verifyEmail/:token" component={Auth} />
          */}

          <Route render={() => <div>Miss</div>} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
