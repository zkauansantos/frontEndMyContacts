import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  return ReactDOM.createPortal(
    isLoading && (
    <Overlay>
      <div className="loader" />
    </Overlay>
    ),
   document.getElementById('loader-root'),
);
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
