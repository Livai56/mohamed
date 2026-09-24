export type UserRole = "ADMIN" | "ENSEIGNANT" | "PARENT";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  schoolName: string;
  avatarUrl?: string;
};

export type AuthUserResponse = Partial<User> & {
  first_name?: string;
  last_name?: string;
  school_name?: string;
  role?: string;
};
