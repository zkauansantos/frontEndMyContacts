import Loader from '../../components/Loader';
import useHome from './useHome';

import { Container, IsPedingSpinnerContainer } from './styles';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';

import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';

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
    isPeding,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        qtyOfContacts={contacts.length}
        qtyFilteredContacts={filteredContacts.length}
        hasError={hasError}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} /> }
      {hasContacts && (
        <>
          {isPeding && (
            <IsPedingSpinnerContainer>
              <Spinner size="48px" marginTop="120px" />
            </IsPedingSpinnerContainer>
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

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
        </>
      )}
    </Container>
  );
}
