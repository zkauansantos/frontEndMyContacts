import Button from '../../components/Button';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

export default function CreateContact() {
    return (
      <>
        <PageHeader
          title="Novo Contato"
        />

        <Input placeholder="Nome" />
        <Input placeholder="Nome" />
        <Input placeholder="Nome" />
        <Select>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
        </Select>
        <Button type="button">
          Salvar Alterações
        </Button>
        <Button type="button" disabled>
          Salvar Alterações
        </Button>
      </>
    );
}
