import styled from 'styled-components';

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;

    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

      span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

      img {
        transform: ${({ order }) => (order === 'asc' ? 'rotate(-180deg)' : 'rotate(0deg)')};
        transition:  0.3s ease-in-out;
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
