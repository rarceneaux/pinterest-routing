import React from 'react';

import authData from '../../../helpers/data/authData';

import boardData from '../../../helpers/data/boardData';

import Board from '../Board/Board';


import './Home.scss';

class Home extends React.Component {
  state = {
    boards: [],
  }

getBoards = () => {
  boardData.getBoardsByUid(authData.getUid())
    .then((boards) => this.setState({ boards }))
    .catch((error) => console.error('error', error));
}

componentDidMount() {
  this.getBoards();
}

  deleteBoard =(boardId) => {
    boardData.deleteBoard(boardId)
      .then(() => this.getBoards())
      .catch((err) => console.error('err', err));
  }

  render() {
    return (
      <div className="home">
        <h1>Home Page</h1>
        <div className="boards d-flex flex-wrap">
          {this.state.boards.map((board) => <Board key={board.id} board={board} deleteBoard={this.deleteBoard}/>)}
        </div>
      </div>
    );
  }
}

export default Home;
