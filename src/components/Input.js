import styled, { css } from 'styled-components';

export default styled.input`
  border: none;
  outline: none;
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid #fff;
  transition: border 0.5s ease-in;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
  color: ${theme.colors.danger.main};
  border-color: ${theme.colors.danger.main} !important;


  `}
`;
