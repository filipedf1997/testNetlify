import React from 'react';
import { Container } from './styles';
import { GithubRepository } from '../../pages/Dashboard';
import { FiChevronRight, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface RepoListProps {
  repos: Array<GithubRepository>;
  removeItem: any;
}

const RepoList = ({ repos }: RepoListProps) => {
  return (
    <Container>
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
    </Container>
  );
};

export default RepoList;
