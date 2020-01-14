import React from 'react';
import './BoardForm.scss';
import authData from '../../../helpers/data/authData';
import boardData from '../../../helpers/data/boardData';

class BoardForm extends React.Component {
  state = {
    boardName: '',
    boardDecscription: '',
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    if (boardId) {
      boardData.getSingleBoard(boardId)
        .then((response) => {
          this.setState({ boardName: response.data.name, boardDecscription: response.data.description });
          this.getPinData(boardId);
        })
        .catch((err) => console.error('error in get single board', err));
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDecscription: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const newBoard = {
      name: this.state.boardName,
      description: this.state.boardDecscription,
      uid: authData.getUid(),
    };
    boardData.saveBoard(newBoard)
      .then(() => this.props.history.push('/'))
      .catch((err) => console.error('err', err));
  }

  editBoardEvent = (e) => {
    const { boardId } = this.props.match.params;
    e.preventDefault();
    const newBoard = {
      name: this.state.boardName,
      description: this.state.boardDecscription,
      uid: authData.getUid(),
    };
    boardData.updateBoard(boardId, newBoard)
      .then(() => this.props.history.push('/'))
      .catch((err) => console.error('err', err));
  }

  render() {
    const { boardName, boardDecscription } = this.state;
    const { boardId } = this.props.match.params;
    return (
      <form className="boardform">
       <div className="form-group">
         <label htmlFor="board-name">Board Name</label>
         <input 
         type="text"
         className="form-control"
         id="board-name"
         placeholder="Enter board name"
         value={boardName}
         onChange={this.nameChange}
         />
       </div>
       <div className="form-group">
         <label htmlFor="board-description">Board Description</label>
         <input 
         type="text"
         className="form-control"
         id="board-description"
         placeholder="Enter board Info"
         value={boardDecscription}
         onChange={this.descriptionChange}
         />
       </div>
       { boardId
         ? <button className="btn btn-secondary" onClick={this.editBoardEvent}>Edit Board</button>
         : <button className="btn btn-secondary" onClick={this.saveBoardEvent}>Save Board</button>
       }
      </form>
    );
  }
}

export default BoardForm;
