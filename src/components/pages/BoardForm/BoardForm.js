import React from 'react';
import './BoardForm.scss';
import authData from '../../../helpers/data/authData';
import boardData from '../../../helpers/data/boardData';

class BoardForm extends React.Component {
  state = {
    boardName: '',
    boardDecscription: '',
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

  render() {
    const { boardName, boardDecscription } = this.state;
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
       <form className="boardform">
       <div className="form-group">
         <label htmlFor="board-description">Board Description</label>
         <input 
         type="text"
         className="form-control"
         id="board-name"
         placeholder="Enter board Info"
         value={boardDecscription}
         onChange={this.descriptionChange}
         />
       </div>
       <button className="btn btn-secondary" onClick={this.saveBoardEvent}>Save Board</button>
      </form>
      </form>
    );
  }
}

export default BoardForm;
