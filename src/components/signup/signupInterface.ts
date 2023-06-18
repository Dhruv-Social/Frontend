export interface IUser {
  username: string | null;
  displayName: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phonenumber: string | null;
  password: string | null;
}

export interface IUserModal1 {
  username: string | null;
  displayName: string | null;
  firstname: string | null;
  lastname: string | null;
}

export interface IUserModal2 {
  email: string | null;
  phonenumber: string | null;
}

export interface IUserModal3 {
  password: string | null;
}
