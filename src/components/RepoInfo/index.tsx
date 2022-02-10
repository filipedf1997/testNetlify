import React from 'react';
import { Container } from './styles';

interface RepoInfoProps {
  avatar_url: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

const RepoInfo = ({
  avatar_url,
  full_name,
  description,
  stargazers_count,
  forks_count,
  open_issues_count,
}: RepoInfoProps) => {
  return (
    <Container>
      <header>
        <img src={avatar_url} alt={full_name} />
        <div>
          <strong data-testid="full_name">{full_name}</strong>
          <p data-testid="description">{description}</p>
        </div>
      </header>
      <ul>
        <li>
          <strong data-testid="stargazers_count">{stargazers_count}</strong>
          <span>Stars</span>
        </li>
        <li>
          <strong data-testid="forks_count">{forks_count}</strong>
          <span>Forks</span>
        </li>
        <li>
          <strong data-testid="open_issues_count">{open_issues_count}</strong>
          <span>Issues abertas</span>
        </li>
      </ul>
    </Container>
  );
};

export default RepoInfo;
