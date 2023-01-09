import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          setContactName(contact.name);
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
        });
      } catch {
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

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Salvar Alterações"
      />
    </>

  );
}
