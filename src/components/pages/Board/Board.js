import React from 'react';
import { Link } from 'react-router-dom';
import './Board.scss';
import PropTypes from 'prop-types';
import boardShape from '../../../helpers/propz/boardShape';


class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
  }

  render() {
    const { board } = this.props;
    return (
      <div className="Board col-4">
      <div className="card">
    <div className="card-body">
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
