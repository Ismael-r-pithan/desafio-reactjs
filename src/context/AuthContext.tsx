
'use client'

import React, { ReactNode, createContext, useEffect, useState } from "react";
import httpClient from "@/lib/http-client";
import { UserDto } from "@/dtos/user.dto";
import { findTokenInStorage, findUserInStorage, removeTokenInStorage, removeUserInStorage, saveTokenInStorage, saveUserInStorage } from "@/storage";



export type AuthContextProps = {
  user: UserDto;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorage: boolean;
  updateUserProfile: (userUpdated: UserDto) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [ user, setUser ] = useState<UserDto>({} as UserDto);
  const [ isLoadingUserStorage, setIsLoadingUserStorage ] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorage(true);
      const { data } = await httpClient.post("/sessions", { email, password });

      if (data.user && data.token) {

        httpClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        await saveUserInStorage(data.user);
        await saveTokenInStorage(data.token);
        setUser(data.user);
      }

    } catch (error) {
        throw error;
    } finally {
        setIsLoadingUserStorage(false);
    }
  }

  async function signOut() {
    try {
        setIsLoadingUserStorage(true);
        setUser({} as UserDto);
        await removeUserInStorage();
        await removeTokenInStorage();
    } catch (error) {
        throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDto) {
    try {
      setUser(userUpdated);
      await saveUserInStorage(userUpdated);
    } catch (error) {
      throw error;
    }
  }


  async function loadUser() {
    try {
        setIsLoadingUserStorage(true)
        const userLogged = await findUserInStorage();
        const token = await findTokenInStorage();
        if (token && userLogged) {
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(userLogged);
        } 
    } catch (error) {
        throw error;
    } finally {
        setIsLoadingUserStorage(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingUserStorage, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}