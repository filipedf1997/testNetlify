/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RepoList from '../../components/RepoList';
import repoMock from '../mock/repoInfo.json';

describe('Teste do componente Repos da tela de Dashboard', () => {
  it('o botão de excluir repositório deve executar a função corretamente', () => {
    const removeRepo = jest.fn();

    const { getByRole } = render(
      <BrowserRouter>
        <RepoList repos={[repoMock]} removeRepo={removeRepo} />
      </BrowserRouter>,
    );

    const button = getByRole('button');
    expect(button).toBeTruthy();

    fireEvent.click(button);
    expect(removeRepo).toBeCalled();
  });
});
