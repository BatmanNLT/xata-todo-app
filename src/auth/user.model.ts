export class User {
  userName: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
