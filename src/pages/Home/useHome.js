import {
  useEffect,
  useState,
  useTransition,
  useCallback,
} from 'react';
import toast from '../../utils/toast';
import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isPeding, startTransition] = useTransition();

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
    } catch (error) {
        setHasError(true);
        setContacts([]);
    } finally {
        setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(event) {
    const { value } = event.target;

    setSearchTerm(event.target.value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) => (
        contact.name.toLowerCase().includes(value.toLowerCase())
      )));
    });
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contactData) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contactData);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isPeding,
    contacts,
    orderBy,
    searchTerm,
    isLoading,
    hasError,
    isDeleteModalVisible,
    filteredContacts,
    isLoadingDelete,
    contactBeingDeleted,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleDeleteContact,
    handleToggleOrderBy,
    handleTryAgain,
    handleCloseDeleteModal,
  };
}
