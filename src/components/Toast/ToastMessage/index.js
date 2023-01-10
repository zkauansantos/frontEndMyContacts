import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Container } from './styles';
import xCircleIcon from '../../../assets/imgs/icons/x-circle.svg';
import CheckCircleIcon from '../../../assets/imgs/icons/check-circle.svg';

export default function ToastMessage({
 message, onRemoveToast, isLeaving, onAnimationEnd,
}) {
  const animatedElementRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }

    const elementRef = animatedElementRef.current;
    if (isLeaving) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => elementRef.removeEventListener('animationend', handleAnimationEnd);
  }, [isLeaving, onAnimationEnd, message.id]);

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
    onAnimationEnd: PropTypes.func.isRequired,
};
