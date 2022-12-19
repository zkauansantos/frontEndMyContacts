import { Link } from 'react-router-dom';
import {
  Container,
  InputSearchContainer,
  Header,
  ListContainer,
  Card,
} from './styles';
import arrow from '../../assets/imgs/icons/arrow.svg';
import edit from '../../assets/imgs/icons/edit.svg';
import trash from '../../assets/imgs/icons/trash.svg';
// import Modal from '../../components/Modal';

export default function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato" />
      </InputSearchContainer>

      <Header>
        <strong> 3 contatos </strong>
        <Link to="/new"> Novo Contato </Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong> Kauan Santos </strong>
              <small> instagram </small>
            </div>
            <span>kauan@devaca.com.br</span>
            <span>(61) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img style={{ marginTop: 3 }} src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong> Kauan Santos </strong>
              <small> instagram </small>
            </div>
            <span>kauan@devaca.com.br</span>
            <span>(61) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img style={{ marginTop: 3 }} src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong> Kauan Santos </strong>
              <small> instagram </small>
            </div>
            <span>kauan@devaca.com.br</span>
            <span>(61) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img style={{ marginTop: 3 }} src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
