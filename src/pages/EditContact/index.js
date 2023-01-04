import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);
        console.log(contactData);
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

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title="Editar Mateus Silva "
      />
      <ContactForm
        onSubmit={handleSubmit}
        buttonLabel="Salvar Alterações"
      />
    </>

  );
}
