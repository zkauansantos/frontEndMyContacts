import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/imgs/icons/x-circle.svg';
import CheckCircleIcon from '../../../assets/imgs/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveToast }) {
  function handleRemoveToast() {
    onRemoveToast(message.id);
  }

  return (
    <Container
      tabIndex={0}
      role="button"
      type={message.type}
      onClick={handleRemoveToast}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="danger" />}
      {message.type === 'success' && <img src={CheckCircleIcon} alt="check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  onRemoveToast: PropTypes.func.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
  }).isRequired,
};
