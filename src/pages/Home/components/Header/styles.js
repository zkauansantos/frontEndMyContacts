import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin-top: 32px;
  padding: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};

  strong {
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 5px;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    transition: 0.3s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;
