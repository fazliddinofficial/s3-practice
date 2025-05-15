export type NodeEnv = 'development' | 'production';

export interface IConfige {
  SERVER_PORT: number;
  JWT_ACCESS_KEY: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_KEY: string;
  JWT_REFRESH_EXPIRES_IN: string;
  DB_URL: string;
  FILE_SERVER_DOMAIN: string;
  NODE_ENV: NodeEnv;
  S3_ACCESS_KEY: string;
  S3_SECRET_KEY: string;
  S3_ENDPOINT: string;
  S3_BUCKET: string;
}
