import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          setContactName(contact.name);
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;

        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Ocorreu um erro ao obter o contato',
          });
        });
      }
    }

    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const updatedContactData = await ContactsService.updateContact(id, contact);

      setContactName(updatedContactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: error.message.includes('e-mail') ? 'Esse e-mail já está cadastrado' : 'Ocorreu um erro ao cadastrar o contato',
      });
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
