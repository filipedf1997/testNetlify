import styled from 'styled-components';

interface InputProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 3rem;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

export const Input = styled.input<InputProps>`
  flex: 1;
  height: 70px;
  padding: 0 24px;
  border: 2px solid #fff;
  border-radius: 5px 0 0 5px;
  color: #3a3a3a;
  border-right: 0;
  border-color: ${props => (props.hasError ? '#c53030' : undefined)};

  &::placeholder {
    color: #a8a8b3;
  }
`;

export const Form = styled.form`
  margin-top: 40px;
  max-width: 700px;
  display: flex;

  button {
    width: 160px;
    background-color: #04d361;
    border-radius: 0 5px 5px 0;
    border: none;
    color: #fff;
    font-weight: bold;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(80%);
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
