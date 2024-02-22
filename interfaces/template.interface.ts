export interface ITemplateBE {
  domainName: string;
  application: {
    name: string;
    version: string;
    alias: string;
    description: string;
    icon: string;
  };
  devspace: {
    ubuntuDistro: string;
    desktop: string;
    version: string;
  };
}

export interface ITemplate {
  category: string;
  image: {
    os: string;
    distro: string;
    desktop: string;
    version: string;
  };
  app: {
    name: string;
    version: string;
    alias: string;
    description: string;
    icon: string;
  };
}

export interface ICategory {
  category: string;
  alias: string;
}
