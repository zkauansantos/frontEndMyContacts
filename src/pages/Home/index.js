import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import arrow from '../../assets/imgs/icons/arrow.svg';
import edit from '../../assets/imgs/icons/edit.svg';
import trash from '../../assets/imgs/icons/trash.svg';
import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
} from './styles';
// import Loader from '../../components/Loader';
// import Modal from '../../components/Modal';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
     ))), [contacts, searchTerm]);

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
    .then(async (response) => {
      const json = await response.json();
      setContacts(json);
    })
    .catch((error) => {
      console.log('error', error);
    });
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
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
