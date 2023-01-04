/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px 32px;
  background: ${({ theme, type }) => (
    type === 'danger'
    ? theme.colors.danger.main
    : (
        type === 'success'
        ? theme.colors.success.main
        : theme.colors.primary.main
      )
    )};
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  & + & {
    margin-top: 12px;
  }
`;
