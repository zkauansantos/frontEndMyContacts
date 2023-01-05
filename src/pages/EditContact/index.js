import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({ type: 'danger', text: 'Ocorreu um erro ao obter o contato' });
      }
    }

    loadContact();
  }, [id, history]);
  function handleSubmit() {
    //
  }
  console.log(contactFormRef);
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title="Editar"
      />
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Salvar Alterações"
      />
    </>

  );
}
