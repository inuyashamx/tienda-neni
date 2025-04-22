export interface User {
  email: string;
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
