import React from 'react';
import { Link } from 'react-router-dom';

import authData from '../../../helpers/data/authData';

import boardData from '../../../helpers/data/boardData';

import Board from '../Board/Board';


import './Home.scss';

class Home extends React.Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((error) => console.error('error', error));
  }

  render() {
    return (
      <div className="home">
        <h1>Home Page</h1>
        <div className="boards d-flex flex-wrap">
          {this.state.boards.map((board) => <Board key={board.id} board={board}/>)}
        </div>
      </div>
    );
  }
}

export default Home;
