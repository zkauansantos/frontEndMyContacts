import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  height: 52px;
  padding: 0 16px;
  border: none;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  color: #fff;
  border-radius: 4px;
  transition: background 0.2s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
  background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
  background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background: #ccc;
    cursor: default;
  }

  ${({ danger, theme }) => danger && css`
      background: ${theme.colors.danger.main};

  &:hover{
  background: ${theme.colors.danger.light};
  }

  &:active {
  background: ${theme.colors.danger.dark};
  }
  `}
`;
