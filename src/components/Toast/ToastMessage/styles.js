/* eslint-disable no-nested-ternary */
import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
  opacity: 1;
  transform: translateY(0px);
    }
`;
const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }
  to {
  opacity: 0;
  transform: translateY(100px);
    }
`;

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
  animation: ${messageIn} 0.2s;
  ${({ isLeaving }) => isLeaving && css`
    animation: ${messageOut} 0.3s;
  `}


  cursor: pointer;

  & + & {
    margin-top: 12px;
  }
`;
