import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin-top: 80px;

  > div {
    display: flex;
    margin-bottom: 24px;

    button {
      border: none;
      background-color: transparent;
      align-self: center;
      cursor: pointer;
      margin-left: 16px;

      svg {
        color: #c53030;
      }
    }

    a {
      background: #fff;
      border-radius: 5px;
      width: 100%;
      padding: 24px;
      display: flex;
      align-items: center;
      transition: transform 0.2s;

      &:hover {
        transform: translateX(6px);
      }

      & + a {
        margin-top: 16px;
      }

      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }

      div {
        margin: 0 16px;
        flex: 1;

        strong {
          font-size: 20px;
          color: #3d3d4d;
        }

        p {
          font-size: 18px;
          color: #a8a8b3;
          margin-top: 4px;
        }
      }

      svg {
        color: #cbcbd6;
      }
    }
  }
`;
