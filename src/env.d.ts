declare interface ImportMeta {
  readonly env: Env;
}

declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_GITHUB_TOKEN: string;
  [key: string]: any;
}
