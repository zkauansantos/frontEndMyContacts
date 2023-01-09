import { useRef } from 'react';
import toast from '../../utils/toast';
import ContactsService from '../../services/ContactsService';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
     await ContactsService.createContact(contact);

     contactFormRef.current.resetFields();

     toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso',
       });
    } catch (error) {
      toast({
        type: 'danger',
        text: error.message.includes('e-mail') ? 'Esse e-mail já está cadastrado' : 'Ocorreu um erro ao cadastrar o contato',
      });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
