import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Title, Form, Error, Input } from './styles';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { fechtRepoInfo } from '../../services/repoServices';
import RepoList from '../../components/RepoList';

export interface GithubRepository {
  id: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const LOCAL_STORAGE_KEY = '@GitCollection:repositories';

const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Informe um repositório.');
      return;
    }

    const endPoint = `/repos/${newRepo}`;
    const response = await fechtRepoInfo(api, endPoint, setInputError);

    if (!response) return;

    const newRepos = [...repos, response.data];
    setRepos(newRepos);
    setNewRepo('');
    updateLocalStorage(newRepos);
    setInputError('');
  }

  function updateLocalStorage(newRepos: GithubRepository[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRepos));
  }

  function removeItemLocalStorage(repo: GithubRepository) {
    const filteredRepos = repos.filter(item => item.id !== repo.id);
    setRepos(filteredRepos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredRepos));
  }

  useEffect(() => {
    const storageRepos = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storageRepos) setRepos(JSON.parse(storageRepos));
  }, []);

  return (
    <>
      <img width={200} src={logo} alt="GithubCollention" />
      <Title>Coleção de repositórios do Github</Title>

      <Form onSubmit={handleAddRepo}>
        <Input
          onChange={handleInputChange}
          placeholder="user/repository_name"
          value={newRepo}
          hasError={!!inputError}
        />
        <button type="submit">Buscar</button>
      </Form>

      {!!inputError && <Error>{inputError}</Error>}

      <RepoList repos={repos} />
    </>
  );
};

export default Dashboard;
