import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const InputSearchContainer = styled.div`
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

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;

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

export const ListContainer = styled.div`
  margin-top: 24px;

  header {
    margin-bottom: 8px;

    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
    }

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const Card = styled.div`
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
      margin-top: 16px;
    }
    .info {
        .contact-name {
            display: flex;
            align-items: center;

            small {
              background: ${({ theme }) => theme.colors.primary.lighter};
              color: ${({ theme }) => theme.colors.primary.main};
              font-weight: bold;
              padding: 4px;
              text-transform: uppercase;
              border-radius: 4px;
              margin-left: 8px;
            }
        }

        span {
            font-size: 14px;
            display: block;
            color: ${({ theme }) => theme.colors.gray[200]};
        }
    }

    .actions {
      display: flex;
      align-items: center;

      button {
        background: transparent;
        border: none;
        margin-left: 8px;
      }
    }
`;