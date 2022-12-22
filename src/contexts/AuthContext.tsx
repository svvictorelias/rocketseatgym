import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  function signIn(email: string, password: string) {
    console.log(email, password);
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
