import { Owner } from './owner';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  language: string;
  languages_url: string;
  homepage: string;
  archived: boolean;
  disabled: boolean;
  owner: Owner;
  html_url: URL;
  pushed_at: string;
  fork: boolean;
  size: number;
  description: string;
  image?: URL;
  pushedAt?: Date;
}
