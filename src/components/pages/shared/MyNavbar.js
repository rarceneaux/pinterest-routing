import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// import firebaseApp from '../../../helpers/data/connection';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Boards</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/board/new">New Board</Link></li>
            <li className="nav-item"><button className="nav-link btn btn-danger" onClick={this.logMeOut}>LOGOUT</button></li>
           </ul>
        );
      }

      return (<ul className="navbar-nav ml-auto"></ul>);
    };

    return (
      <div className="MyNavbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Pinterest</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          { buildNavbar() }
          </div>
        </nav>
      </div>
    );
  }
}
export default MyNavbar;
