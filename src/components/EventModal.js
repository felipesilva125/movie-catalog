import React, { useState, useRef } from 'react';
import Modal from '../components/Modal'
import '../style/style-home.css';
import '../style/style-modal.css';

class EventModal extends React.Component {
  state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
      <div>
        <header>
        {/* <button
          onClick={e => {
            this.showModal(e);
          }}
        >
          {" "}
          show Modal{" "}
        </button> */}
          <Modal onClose={this.showModal} show={this.state.show} ></Modal>
        </header>
      </div>
    );
  }
}

export default EventModal;