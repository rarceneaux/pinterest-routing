import React from 'react';
import { Link } from 'react-router-dom';
import './Board.scss';
import PropTypes from 'prop-types';
import boardShape from '../../../helpers/propz/boardShape';


class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    deleteBoard: PropTypes.func,
  }

deleteBoardEvent = (e) => {
  e.preventDefault();
  const { deleteBoard, board } = this.props;
  deleteBoard(board.id);
}

render() {
  const { board } = this.props;
  return (
      <div className="Board col-4">
      <div className="card">
    <div className="card-body">
      <button className="btn btn-danger" onClick={this.deleteBoardEvent}>Delete</button>
      <Link className="btn btn-warning" to={`/board/${board.id}/edit`}>Edit</Link>
  <p className="card-title">{board.name}</p>
  <h5 className="card-text">{board.description}</h5>
  <Link className="btn btn-primary" to={`/board/${board.id}`}>View Board</Link>
    </div>
  <div>
</div>
</div>
</div>
  );
  }
}

export default Board;
