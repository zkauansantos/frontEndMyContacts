import { Link } from 'react-router-dom';
import { Container } from './styles';
import logo from '../../assets/imgs/logo.svg';

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="MyContacts" width="201" />
      </Link>
    </Container>
  );
}
