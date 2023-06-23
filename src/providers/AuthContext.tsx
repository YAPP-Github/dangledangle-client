'use client';

import {
  CLIENT_ACCESS_TOKEN_KEY,
  CLIENT_REFRESH_TOKEN_KEY
} from '@/api/cookieKeys';
import cookie from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

const protectedRoutes = ['/volunteer', '/shelter', '/admin'];

type User = {
  shelterId: string;
  shelterUserId: string;
};

type AuthState = {
  user: User;
  dangle_access_token: string | null;
  logout: () => void;
};

const initialAuthState: AuthState = {
  user: {
    shelterId: '',
    shelterUserId: ''
  },
  dangle_access_token: null,
  logout: () => {}
};

type AuthContextProps = {
  user: User;
  dangle_access_token: string | null;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: initialAuthState.user,
  dangle_access_token: initialAuthState.dangle_access_token,
  setAuthState: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState(initialAuthState);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const dangle_access_token = cookie.get(CLIENT_ACCESS_TOKEN_KEY);

    if (dangle_access_token) {
      setAuthState(prevState => ({
        ...prevState,
        dangle_access_token
      }));
    } else {
      if (!protectedRoutes.some(route => pathname.includes(route)))
        router.push('/');
    }
  }, [router, pathname]);

  const logout = useCallback(() => {
    cookie.remove(CLIENT_ACCESS_TOKEN_KEY);
    cookie.remove(CLIENT_REFRESH_TOKEN_KEY);
    setAuthState(initialAuthState);
  }, []);

  const { user, dangle_access_token } = authState;

  return (
    <AuthContext.Provider
      value={{ user, dangle_access_token, setAuthState, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
