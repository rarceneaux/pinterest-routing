import React from 'react';
import authData from '../../../helpers/data/authData';
import pinData from '../../../helpers/data/pinData';


class PinForm extends React.Component {
  state = {
    pinImageUrl: '',
    pinTitle: '',
  }

  componentDidMount() {
    const { pinId } = this.props.match.params;
    if (pinId) {
      pinData.getSinglePin(pinId)
        .then((request) => {
          const pin = request.data;
          this.setState({ pinTitle: pin.title, pinImageUrl: pin.imageUrl });
        })
        .catch((err) => console.error('err', err));
    }
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { boardId, pinId } = this.props.match.params;
    const editPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    }
    pinData.editPin(pinId, editPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('error with edit pin', err));
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
    const { pinId } = this.props.match.params;
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
       { pinId
         ? <button className="btn btn-secondary" onClick={this.editPinEvent}>Edit Pin</button>
         : <button className="btn btn-secondary" onClick={this.savePinEvent}>Save Pin</button>
        }
      </form>
    );
  }
}

export default PinForm;
