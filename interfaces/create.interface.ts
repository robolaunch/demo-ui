export interface ICreateEnvironmentForm {
  name: string;
  appConfig: {
    category: string;
    image: {
      distro: string;
      desktop: string;
      version: string;
    };
    app: {
      name: string;
      version: string;
    };
  };
  ideEnabled: boolean;
  vdiEnabled: boolean;
  jupyterNotebookEnabled: boolean;
  repoURL?: string;
  repoBranch?: string;
}
