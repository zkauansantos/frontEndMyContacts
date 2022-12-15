import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function CreateContact() {
    return (
      <>
        <PageHeader
          title="Novo Contato"
        />

        <ContactForm buttonLabel="Salvar Alterações" />
      </>
    );
}
