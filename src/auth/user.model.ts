export class User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
