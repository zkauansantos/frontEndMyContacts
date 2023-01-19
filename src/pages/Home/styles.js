import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const IsPedingSpinnerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction:column ;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  background: rgba(246, 245, 252, 0.8);
`;
