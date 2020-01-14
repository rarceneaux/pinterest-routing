import React from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import pinShape from '../../../../helpers/propz/pinShape';
import './Pin.scss';

class Pin extends React.Component {
    static propTypes = {
      pin: pinShape.pinShape,
      deletePin: Proptypes.func,
    }

    deletePinEvent = (e) => {
      e.preventDefault();
      const { deletePin, pin } = this.props;
      deletePin(pin.id);
    }

    render() {
      const { pin } = this.props;
      return (
    <div className="Pin col-3">
        <div className="card">
          <img src={pin.imageUrl} className="card-img-top" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
            <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete</button>
            <Link className="btn btn-primary" to={`/board/${pin.boardId}/pin/${pin.id}/edit`}>Edit</Link>
          </div>
        </div>
      </div>
      );
    }
}

export default Pin;
