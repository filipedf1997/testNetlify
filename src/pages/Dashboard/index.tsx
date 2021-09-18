import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

interface GithubRepository {
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
    try {
      event.preventDefault();

      if (!newRepo) {
        setInputError('Informe um repositório.');
        return;
      }

      const response = await api.get<GithubRepository>(`/repos/${newRepo}`);
      const newRepos = [...repos, response.data];
      setRepos(newRepos);
      setNewRepo('');
      updateLocalStorage(newRepos);
      setInputError('');
    } catch (error) {
      setInputError(
        'Não foi possível encontrar o repositório. Tente novamente.',
      );
    }
  }

  function updateLocalStorage(newRepos: GithubRepository[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRepos));
  }

  useEffect(() => {
    const storageRepos = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storageRepos) setRepos(JSON.parse(storageRepos));
  }, []);

  return (
    <>
      <img width={200} src={logo} alt="GithubCollention" />
      <Title>Coleção de repositórios do Github</Title>

      <Form onSubmit={handleAddRepo} hasError={!!inputError}>
        <input
          onChange={handleInputChange}
          placeholder="user/repository_name"
          value={newRepo}
        />
        <button type="submit">Buscar</button>
      </Form>

      {!!inputError && <Error>{inputError}</Error>}

      <Repos>
        {repos.map((repo, index) => (
          <Link
            to={`/repositories/${repo.full_name}`}
            key={repo.full_name + index}
          >
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
};

export default Dashboard;
