import styled from 'styled-components';

export const Container = styled.div`
margin-top: 16px;
gap: 16px;
display: flex;
flex-direction: column;
align-items: center;

p{
  color: ${({ theme }) => theme.colors.gray[200]};
  text-align: center;
  max-width: 85%;

  span {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};
  }
}
`;
