import { UserDto } from "@/dtos/user.dto";

export const saveUserInStorage = async (user: UserDto) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const findUserInStorage = async (): Promise<UserDto | null> => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  };
  
  export const removeUserInStorage = async () => {
    localStorage.removeItem('user');
  };
  
  export const saveTokenInStorage = async (token: string) => {
    localStorage.setItem('token', token);
  };
  
  export const findTokenInStorage = async (): Promise<string | null> => {
    return localStorage.getItem('token');
  };
  
  export const removeTokenInStorage = async () => {
    localStorage.removeItem('token');
  };