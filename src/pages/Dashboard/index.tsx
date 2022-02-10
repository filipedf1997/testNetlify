import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiChevronRight, FiXCircle } from 'react-icons/fi';
import { Title, Form, Repos, Error, Input } from './styles';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { fechtRepoInfo } from '../../services/repoServices';
import { Link } from 'react-router-dom';

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

      <Repos>
        {repos.map((repo, index) => (
          <div key={repo.full_name + index}>
            <Link to={`/repositories/${repo.full_name}`}>
              <img src={repo.owner.avatar_url} alt={repo.owner.login} />
              <div>
                <strong>{repo.full_name}</strong>
                <p>{repo.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          </div>
        ))}
      </Repos>
    </>
  );
};

export default Dashboard;
