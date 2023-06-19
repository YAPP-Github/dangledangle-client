'use client';

import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useContext
} from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

type User = {
  shelterId: string;
  shelterUserId: string;
};

type AuthState = {
  user: User;
  accessToken: string | null;
  logout: () => void;
};

const initialAuthState: AuthState = {
  user: {
    shelterId: '',
    shelterUserId: ''
  },
  accessToken: null,
  logout: () => {}
};

type AuthContextProps = {
  user: User;
  accessToken: string | null;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: initialAuthState.user,
  accessToken: initialAuthState.accessToken,
  setAuthState: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState(initialAuthState);
  const router = useRouter();

  useEffect(() => {
    const accessToken = cookie.get('accessToken');

    if (accessToken) {
      setAuthState(prevState => ({
        ...prevState,
        accessToken
      }));
    } else {
      // FIXME: accessToken 없을 시 push할 페이지 논의 필요
      // router.push('/shelter/login');
    }
  }, [router]);

  const logout = () => {
    cookie.remove('accessToken');
    cookie.remove('refreshToken');
    setAuthState(initialAuthState);
  };

  const { user, accessToken } = authState;

  return (
    <AuthContext.Provider value={{ user, accessToken, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
