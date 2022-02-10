import React, { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Header, Issues } from './styles';
import RepoInfo from '../../components/RepoInfo';
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
        <RepoInfo
          avatar_url={repository?.owner.avatar_url}
          full_name={repository?.full_name}
          description={repository?.description}
          stargazers_count={repository?.stargazers_count}
          forks_count={repository?.forks_count}
          open_issues_count={repository?.open_issues_count}
        />
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
