import { useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function CreateContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

     await ContactsService.createContact(contact);
     contactFormRef.current.resetFields();
     toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso',
       });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato',
      });
    }
  }

  return (
    <>
      <PageHeader
        title="Novo Contato"
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar Contato"
        onSubmit={handleSubmit}
      />
    </>
  );
}
