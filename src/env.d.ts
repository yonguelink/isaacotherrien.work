interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /**
   * Built-in environment variable.
   * @see Docs https://github.com/chihab/dotenv-run/packages/angular#node_env.
   */
  readonly NODE_ENV: string;
  readonly NG_APP_GITHUB_TOKEN: string;
  [key: string]: any;
}
