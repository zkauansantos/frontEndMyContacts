/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';
import box from '../../../../assets/imgs/box.svg';

export default function EmptyList() {
 return (
   <Container>
     <img src={box} alt="box" />
     <p>
       Você ainda não tem nenhum contato cadastrado!
       Clique no botão <span> "Novo Contato" </span>
       à cima para cadastrar o seu primeiro!
     </p>
   </Container>
 );
}
