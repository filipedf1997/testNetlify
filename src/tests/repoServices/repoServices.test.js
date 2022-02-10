/* eslint-disable no-undef */
import { fechtRepoInfo } from '../../services/repoServices';
import repoInfo from '../mock/repoInfo.json';

const errorHandler = () => null;

describe('Teste da função fechtRepoInfo', () => {
  it('deve retornar a resposta com repositório encontrado', async () => {
    const api = {
      get: () => repoInfo,
    };

    const response = await fechtRepoInfo(api, 'repoEndpoint', errorHandler);
    expect(response.full_name).toBeTruthy();
    expect(response.description).toBeTruthy();
    expect(response.owner).toBeTruthy();
  });

  it('deve retornar a resposta com erro', async () => {
    const api = {
      get: () => {
        throw new Error();
      },
    };

    const response = await fechtRepoInfo(api, 'repo', errorHandler);
    expect(response).toBeFalsy();
  });
});
