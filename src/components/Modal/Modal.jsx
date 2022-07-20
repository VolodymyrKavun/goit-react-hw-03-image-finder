import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalSt, ModalOverlaySt, BigPhoto } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlaySt onClick={this.handleBackdropClick}>
        <ModalSt>
          <BigPhoto src={this.props.children} alt="qwwqwe" />
        </ModalSt>
      </ModalOverlaySt>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

export default Modal;
