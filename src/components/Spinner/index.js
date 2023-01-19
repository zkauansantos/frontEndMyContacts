import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

export default function Spinner({ size, marginTop }) {
  return <StyledSpinner size={size} marginTop={marginTop} />;
}

Spinner.propTypes = {
  size: PropTypes.string.isRequired,
  marginTop: PropTypes.string,
};

Spinner.defaultProps = {
  marginTop: null,
};
