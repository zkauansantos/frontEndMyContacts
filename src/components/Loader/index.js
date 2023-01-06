import PropTypes from 'prop-types';
import { Overlay } from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal nameId="loader-root">
      <Overlay>
        <Spinner size="72px" />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
