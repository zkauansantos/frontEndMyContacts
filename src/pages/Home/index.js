import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import arrow from '../../assets/imgs/icons/arrow.svg';
import edit from '../../assets/imgs/icons/edit.svg';
import trash from '../../assets/imgs/icons/trash.svg';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
} from './styles';
// import Modal from '../../components/Modal';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
     ))), [contacts, searchTerm]);

  useEffect(() => {
    async function loadingContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);

        setContacts(contactsList);
      } catch (error) {
        console.log('Name: ', error.name);
        console.log('Message: ', error.message);
        console.log('Response: ', error.response);
        console.log('Body: ', error.body);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadingContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar Contato"
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new"> Novo Contato </Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader order={orderBy}>
          <button
            type="button"
            onClick={handleToggleOrderBy}
          >
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && (
              <small>{contact.category_name}</small>
                )}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img style={{ marginTop: 3 }} src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
