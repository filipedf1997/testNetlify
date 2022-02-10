/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import RepoInfo from '../../components/RepoInfo';
import repository from '../mock/repoInfo.json';

describe('Teste do componente RepoInfo', () => {
  it('deve renderizar todas as props passadas corretamente', () => {
    const { getByRole, getByTestId } = render(
      <RepoInfo
        avatar_url={repository.owner.avatar_url}
        full_name={repository.full_name}
        description={repository.description}
        stargazers_count={repository.stargazers_count}
        forks_count={repository.forks_count}
        open_issues_count={repository.open_issues_count}
      />,
    );

    const avatar_url = getByRole('img');
    const full_name = getByTestId('full_name');
    const description = getByTestId('description');
    const stargazers_count = getByTestId('stargazers_count');
    const forks_count = getByTestId('forks_count');
    const open_issues_count = getByTestId('open_issues_count');

    expect(avatar_url.src).toContain(repository.owner.avatar_url);
    expect(full_name.textContent).toBe(repository.full_name);
    expect(description.textContent).toBe(repository.description);
    expect(stargazers_count.textContent).toBe(repository.stargazers_count);
    expect(forks_count.textContent).toBe(repository.forks_count);
    expect(open_issues_count.textContent).toBe(repository.open_issues_count);
  });
});
