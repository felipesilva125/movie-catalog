import React from "react";
import PropTypes from "prop-types";
import '../style/style-modal.css';

export default class Modal extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal">
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.message}</h2>
                    <div>{this.props.children}</div>
                    <div className="button-modal">
                        <button onClick={this.onClose}>
                            Fechar
                        </button>
                </div>
            </div>
        );
    }
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};
