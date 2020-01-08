import React from 'react';
import boardData from '../../../helpers/data/boardData';
import pinData from '../../../helpers/data/pinData';
import Pin from '../shared/Pin/Pin';
import './SingleBoard.scss';


class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  }

  getPinData = (boardId) => {
    pinData.getPinsByBoardId(boardId)
      .then((pins) => this.setState({ pins }))
      .catch((error) => console.error('error', error));
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    boardData.getSingleBoard(boardId)
      .then((response) => {
        this.setState({ board: response.data });
        this.getPinData(boardId);
      });
  }

  render() {
    const { board } = this.state;
    return (
      <div className="singleBoard">
  <h1>{board.name}</h1>
  <p>{board.description}</p>
    <div className="pins d-flex flex-wrap">
      { this.state.pins.map((pin) => <Pin key={pin.id} pin={pin}/>)}
    </div>
      </div>
    );
  }
}

export default SingleBoard;
