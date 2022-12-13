import { Container } from './styles';

import logo from '../../assets/imgs/logo.svg';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201" />
    </Container>
  );
}
