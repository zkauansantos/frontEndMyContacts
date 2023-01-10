import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import { Container } from './styles';
import sad from '../../../../assets/imgs/sad.svg';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="sad" />
      <div>
        <strong>Ocorreu um erro ao obter os seus contatos</strong>

        <Button type="button" onTryAgain={onTryAgain}>
          Tentar Novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
