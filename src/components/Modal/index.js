import { Container, Overlay, Footer } from './styles';
import Button from '../Button';

export default function Modal() {
  return (
    <Overlay>
      <Container>
        <h1>SSSS</h1>
        <p>SSSSS</p>

        <Footer>
          <button className="cancel-button" type="button"> Cancelar</button>
          <Button type="button"> Deletar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}
