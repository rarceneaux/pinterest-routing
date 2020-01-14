import React from 'react';
import authData from '../../../helpers/data/authData';
import pinData from '../../../helpers/data/pinData';

class PinForm extends React.Component {
  state = {
    pinImageUrl: '',
    pinTitle: '',
  }


  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    const { boardId } = this.props.match.params;
    e.preventDefault();
    const newPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.savePin(newPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('err', err));
  }

  render() {
    const { pinImageUrl, pinTitle } = this.state;
    return (
      <form className="pinform">
       <div className="form-group">
         <label htmlFor="pin-title"> Pin Title</label>
         <input 
         type="text"
         className="form-control"
         id="pin-title"
         placeholder="Enter Pin Title"
         value={pinTitle}
         onChange={this.titleChange}
         />
       </div>
       <form className="pinform">
       <div className="form-group">
         <label htmlFor="pin-imageUrl">Pin Img</label>
         <input 
         type="text"
         className="form-control"
         id="pinImageUrl"
         placeholder="Enter board Info"
         value={pinImageUrl}
         onChange={this.imageUrlChange}
         />
       </div>
       <button className="btn btn-secondary" onClick={this.savePinEvent}>Save Pin</button>
      </form>
      </form>
    );
  }
}

export default PinForm;
