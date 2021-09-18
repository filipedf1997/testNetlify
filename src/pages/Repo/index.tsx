import React, { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Header, RepoInfo, Issues } from './styles';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface GithubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GithubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repo: React.FC = () => {
  const [repository, setRepository] = useState<GithubRepository | null>(null);
  const [issues, setIssues] = useState<GithubIssue[]>([]);
  const { params } = useRouteMatch<RepositoryParams>();

  const getRepoInfos = useCallback(async () => {
    try {
      const response = await api.get(`repos/${params.repository}`);
      setRepository(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [params.repository]);

  const getRepoIssues = useCallback(async () => {
    try {
      const response = await api.get(`repos/${params.repository}/issues`);
      setIssues(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [params.repository]);

  useEffect(() => {
    getRepoInfos();
    getRepoIssues();
  }, [getRepoInfos, getRepoIssues]);

  return (
    <>
      <Header>
        <img width={200} src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepoInfo>
          <header>
            <img src={repository?.owner.avatar_url} alt="Aluizio Developer" />
            <div>
              <strong>{repository?.full_name}</strong>
              <p>{repository?.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository?.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository?.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository?.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepoInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a
            href={issue.html_url}
            target="_blank"
            key={issue.id}
            rel="noreferrer"
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repo;
