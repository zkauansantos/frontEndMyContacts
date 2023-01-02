import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay } from './styles';
import Spinner from '../Spinner';

export default function Loader({ isLoading }) {
  return ReactDOM.createPortal(
    isLoading && (
    <Overlay>
      <Spinner size="72px" />
    </Overlay>
    ),
   document.getElementById('loader-root'),
);
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
