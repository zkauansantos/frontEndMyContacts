/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
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
import box from '../../assets/imgs/box.svg';
import sad from '../../assets/imgs/sad.svg';
import magnifierQuestion from '../../assets/imgs/magnifier-question.svg';

import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  BoxListContainer,
  NoContactFoundList,
} from './styles';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);

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

  function handleDeleteContact(contactData) {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contactData);
  }

  function handleConfirmDeleteContact() {
    //
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        visible={isDeleteModalVisible}
        danger
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"`}
        confirmLabel="Deletar"
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={() => handleConfirmDeleteContact}
      >
        <p>Essa ação não poderá ser desfeita</p>
      </Modal>

      {(contacts.length > 0 && !hasError) && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar Contato"
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
              )
        }
      >
        {(!hasError && contacts.length > 0) && (
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

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <BoxListContainer>
              <img src={box} alt="box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <span> "Novo Contato" </span>
                à cima para cadastrar o seu primeiro!
              </p>
            </BoxListContainer>
          )}

          {(filteredContacts.length < 1 && !isLoading) && (
            <NoContactFoundList>
              <img src={magnifierQuestion} alt="magnifier-question" />
              <span>Nenhum contato encontrado para <strong>"{searchTerm}"</strong></span>
            </NoContactFoundList>
          )}

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
                <button onClick={() => handleDeleteContact(contact)} type="button">
                  <img src={trash} alt="delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
}
