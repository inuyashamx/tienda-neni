import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, AuthProviderProps } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getFakeUser(): User | null {
  const user = localStorage.getItem('fakeUser');
  return user ? JSON.parse(user) : null;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(getFakeUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem('fakeUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('fakeUser');
    }
  }, [user]);

  function login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('fakeUsers') || '{}');
    if (users[email] && users[email] === password) {
      setUser({ email });
      return true;
    }
    return false;
  }

  function register(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('fakeUsers') || '{}');
    if (users[email]) {
      return false;
    }
    users[email] = password;
    localStorage.setItem('fakeUsers', JSON.stringify(users));
    setUser({ email });
    return true;
  }

  function logout(): void {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
