import {
 Container, Header, ListContainer, Card,
} from './styles';
import arrow from '../../assets/imgs/icons/arrow.svg';
import edit from '../../assets/imgs/icons/edit.svg';
import trash from '../../assets/imgs/icons/trash.svg';

export default function ContactsList() {
    return (
      <Container>
        <Header>
          <strong> 3 contatos </strong>
          <a href="/"> Novo Contato </a>
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
              <a href="/">
                <img src={edit} alt="edit" />
              </a>

              <button type="button">
                <img src={trash} alt="delete" />
              </button>
            </div>
          </Card>
        </ListContainer>
      </Container>
    );
}
