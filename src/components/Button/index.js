import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({
 children, type, disabled, isLoading,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {isLoading && <Spinner size="16px" />}
      {!isLoading && children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
};
