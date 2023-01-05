import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Container, Overlay, Footer } from './styles';
import Button from '../Button';

export default function Modal({
 danger,
 title,
 children,
 cancelLabel,
 confirmLabel,
 onCancel,
 onConfirm,
 visible,
}) {
  return ReactDOM.createPortal(
    visible
    && (
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>

        {children}

        <Footer>
          <button
            onClick={onCancel}
            className="cancel-button"
            type="button"
          >
            {cancelLabel}
          </button>
          <Button
            onConfirm={onConfirm}
            danger={danger}
            type="button"
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>
),
   document.getElementById('modal-root'),
);
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  children: '',
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
