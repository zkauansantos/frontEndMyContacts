import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/imgs/icons/x-circle.svg';
import CheckCircleIcon from '../../../assets/imgs/icons/check-circle.svg';

export default function ToastMessage({ type, text }) {
  return (
    <Container type={type}>
      {type === 'danger' && <img src={xCircleIcon} alt="danger" />}
      {type === 'success' && <img src={CheckCircleIcon} alt="check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
