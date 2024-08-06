export interface IUser {
    name: string;
    email: string;
    password: string;
    userType: "admin" | "poweruser" | "normal"; // Use the enum type for userType
  }