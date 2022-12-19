import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Container, Overlay, Footer } from './styles';
import Button from '../Button';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>SSSS</h1>
        <p>SSSSS</p>

        <Footer>
          <button className="cancel-button" type="button"> Cancelar</button>
          <Button danger={danger} type="button"> Deletar</Button>
        </Footer>
      </Container>
    </Overlay>,
   document.getElementById('modal-root'),
);
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
