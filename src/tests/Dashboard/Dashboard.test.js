/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { Form, Input } from '../../pages/Dashboard/styles';

describe('Teste do componente Form da tela de Dashboard', () => {
  it('a função de callback do Form deve ser chamada ao se clicar no botão "Buscar"', () => {
    const handleAddRepo = jest.fn(e => e.preventDefault());

    const { getByRole } = render(
      <Form onSubmit={handleAddRepo}>
        <button type="submit">Buscar</button>
      </Form>,
    );

    fireEvent.click(getByRole('button'));
    expect(handleAddRepo).toBeCalled();
  });

  it('o Input do Form deve ter bordas vermelhas quando existir um erro', () => {
    const input = renderer.create(<Input hasError />).toJSON();

    expect(input).toHaveStyleRule('border-color', '#c53030');
  });
});

describe('Teste do componente Repos da tela de Dashboard', () => {
  it('o botão de excluir repositório deve executar a função corretamente', () => {});
});
