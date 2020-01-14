import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase';
import MyNavbar from '../components/pages/shared/MyNavbar';
import './App.scss';
import Auth from '../components/pages/Auth/Auth';
import BoardForm from '../components/pages/BoardForm/BoardForm';
import SingleBoard from '../components/pages/SingleBoard/SingleBoard';
import Home from '../components/pages/Home/Home';
import PinForm from '../components/pages/PinForm/PinForm';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';


// will be important for backend
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
    <div className="App">
    <Router>
      <MyNavbar authed={authed}/>
      <Switch>
        <PrivateRoute path="/" exact component={Home} authed={authed}/>
        <PrivateRoute path="/board/new" exact component={BoardForm} authed={authed}/>
        <PublicRoute path="/auth" exact component={Auth} authed={authed}/>
        <PrivateRoute path="/board/:boardId" exact component={SingleBoard} authed={authed} />
        <PrivateRoute path="/board/:boardId/pin/new" exact component={PinForm} authed={authed} />
      </Switch>
    </Router>
  </div>
    );
  }
}

export default App;
