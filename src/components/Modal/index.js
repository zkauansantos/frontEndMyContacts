import PropTypes from 'prop-types';
import { Container, Overlay, Footer } from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';

export default function Modal({
 danger,
 title,
 isLoading,
 children,
 cancelLabel,
 confirmLabel,
 onCancel,
 onConfirm,
 visible,
}) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal nameId="modal-root">
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>

          {children}

          <Footer>
            <button
              onClick={onCancel}
              className="cancel-button"
              type="button"
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              onConfirm={onConfirm}
              danger={danger}
              type="button"
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: true,
  children: '',
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
