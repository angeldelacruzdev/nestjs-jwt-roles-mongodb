export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  hash: string;
  hashdRt: string;
  roles: string[];
  isAdmin: boolean;
}
