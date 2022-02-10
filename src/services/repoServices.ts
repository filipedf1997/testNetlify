export async function fechtRepoInfo(
  apiService: any,
  endPoint: string,
  errorHandler: any,
) {
  try {
    const response = await apiService.get(endPoint);
    return response;
  } catch (error) {
    errorHandler('Não foi possível encontrar o repositório. Tente novamente.');
    return false;
  }
}
