import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;

    input {
        width: 100%;
        border-radius: 25px;
        height: 50px;
        background: #fff;
        border: none;
        box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
        outline: 0;
        padding: 0 16px;

        &::placeholder {
          color: ${({ theme }) => theme.colors.gray[200]};
        }
    }
`;
