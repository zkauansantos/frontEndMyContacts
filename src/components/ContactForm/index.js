import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome" />
      </FormGroup>
      <FormGroup
        error="O formato do e-mail é invalido"
      >
        <Input placeholder="E-mail" error />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>
      <FormGroup>
        <Select>
          <option value="Instagram">Instagram </option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="Button">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>

  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
