import { Link } from 'react-router-dom';
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import arrow from '../../assets/imgs/icons/arrow.svg';
import edit from '../../assets/imgs/icons/edit.svg';
import trash from '../../assets/imgs/icons/trash.svg';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import sad from '../../assets/imgs/sad.svg';
import Button from '../../components/Button';

import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
} from './styles';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
     ))), [contacts, searchTerm]);

      const loadContacts = useCallback(async () => {
        try {
          setIsLoading(true);

          const contactsList = await ContactsService.listContacts(orderBy);

          setHasError(false);
          setContacts(contactsList);
        } catch (error) {
          setHasError(true);
        } finally {
          setIsLoading(false);
        }
      }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
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

      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new"> Novo Contato </Link>
      </Header>

      {hasError && (
      <ErrorContainer>
        <img src={sad} alt="sad" />
        <div>
          <strong>Ocorreu um erro ao obter os seus contatos</strong>

          <Button type="button" onClick={handleTryAgain}>
            Tentar Novamente
          </Button>
        </div>
      </ErrorContainer>
    )}

      {!hasError && filteredContacts.length > 0 && (
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

      {!hasError && filteredContacts.map((contact) => (
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
