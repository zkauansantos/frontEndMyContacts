import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({
 children, type, disabled, isLoading, danger, onConfirm,
}) {
  return (
    <StyledButton
      onClick={onConfirm}
      danger={danger}
      type={type}
      disabled={disabled || isLoading}
    >
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
  danger: PropTypes.bool,
  onConfirm: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onConfirm: undefined,
};
