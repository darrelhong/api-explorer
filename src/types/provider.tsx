export interface ProviderData {
  info: {
    title: string;
    description: string;
    contact: {
      name: string;
      url: string;
      email: string;
    };
    "x-logo": { url: string };
  };
  swaggerUrl: string;
}
