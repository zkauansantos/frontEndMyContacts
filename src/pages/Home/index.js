/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import arrow from '../../assets/imgs/icons/arrow.svg';
import edit from '../../assets/imgs/icons/edit.svg';
import trash from '../../assets/imgs/icons/trash.svg';
import box from '../../assets/imgs/box.svg';
import sad from '../../assets/imgs/sad.svg';
import magnifierQuestion from '../../assets/imgs/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import useHome from './useHome';

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
  const {
    isLoading,
    isDeleteModalVisible,
    hasError,
    contacts,
    contactBeingDeleted,
    isLoadingDelete,
    searchTerm,
    orderBy,
    filteredContacts,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleDeleteContact,
    handleToggleOrderBy,
    handleTryAgain,
    handleCloseDeleteModal,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        visible={isDeleteModalVisible}
        danger
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"`}
        isLoading={isLoadingDelete}
        confirmLabel="Deletar"
        onCancel={() => handleCloseDeleteModal()}
        onConfirm={() => handleConfirmDeleteContact()}
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
            !contacts.length < 1 && (
              <NoContactFoundList>
                <img src={magnifierQuestion} alt="magnifier-question" />
                <span>Nenhum contato encontrado para <strong>"{searchTerm}"</strong></span>
              </NoContactFoundList>
            )
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
                  {contact.category.name && (
                  <small>{contact.category.name}</small>
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
