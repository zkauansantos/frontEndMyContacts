import PropTypes from 'prop-types';
import { useEffect, memo } from 'react';
import { Container } from './styles';
import xCircleIcon from '../../../assets/imgs/icons/x-circle.svg';
import CheckCircleIcon from '../../../assets/imgs/icons/check-circle.svg';

function ToastMessage({
 message, onRemoveToast, isLeaving, animatedElementRef,
}) {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onRemoveToast(message.id);
    }, message.duration || 5000);

    return () => clearTimeout(timeOutId);
  }, [message, onRemoveToast]);

  function handleRemoveToast() {
    onRemoveToast(message.id);
  }

  return (
    <Container
      isLeaving={isLeaving}
      tabIndex={0}
      role="button"
      type={message.type}
      onClick={handleRemoveToast}
      ref={animatedElementRef}
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
    duration: PropTypes.number,
  }).isRequired,
    isLeaving: PropTypes.bool.isRequired,
    animatedElementRef: PropTypes.shape().isRequired,
};

export default memo(ToastMessage);
