declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GRAPHQL_URL: string;
    NEXT_PUBLIC_WEB_URL: string;
    NEXT_PUBLIC_APM_SERVICE_URL: string;
    NEXT_PUBLIC_ENVIRONMENT: string;
  }
}