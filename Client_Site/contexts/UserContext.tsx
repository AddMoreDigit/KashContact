import { createContext, useContext, ReactNode } from 'react';

export type UserType = 'user' | 'vendor' | 'corporate' | null;

interface UserContextType {
  userType: UserType;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
  userType: UserType;
}

export function UserProvider({ children, userType }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ userType }}>
      {children}
    </UserContext.Provider>
  );
}
