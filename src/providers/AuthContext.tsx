'use client';

import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY
} from '@/constants/cookieKeys';
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
import jwt, { JwtPayload } from 'jsonwebtoken';

const protectedRoutes = ['/volunteer', '/shelter', '/admin'];

type VolunteerUser = {
  id: string;
};

type ShelterUser = {
  shelterId: string;
  shelterUserId: string;
};

type AuthState = {
  user: ShelterUser;
  dangle_access_token: string | null;
  dangle_id: number | null;
  dangle_role: 'VOLUNTEER' | 'SHELTER' | 'NONE';
  logout: () => void;
};

interface DecodeToken extends JwtPayload {
  email: string;
  exp: number;
  iat: number;
  id: number;
  role: 'VOLUNTEER' | 'SHELTER' | 'NONE';
}

const initialAuthState: AuthState = {
  user: {
    shelterId: '',
    shelterUserId: ''
  },
  dangle_access_token: null,
  dangle_id: null,
  dangle_role: 'NONE',
  logout: () => {}
};

type AuthContextProps = {
  user: ShelterUser | VolunteerUser;
  dangle_access_token: string | null;
  dangle_id: number | null;
  dangle_role: 'VOLUNTEER' | 'SHELTER' | 'NONE';
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: initialAuthState.user,
  dangle_access_token: initialAuthState.dangle_access_token,
  dangle_id: initialAuthState.dangle_id,
  dangle_role: initialAuthState.dangle_role,
  setAuthState: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState(initialAuthState);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const dangle_access_token = cookie.get(COOKIE_ACCESS_TOKEN_KEY);

    if (dangle_access_token) {
      const decoded = jwt.decode(dangle_access_token);
      const isDecodeToken = (decoded: any): decoded is DecodeToken => {
        return (
          decoded &&
          typeof decoded === 'object' &&
          (decoded.role === 'VOLUNTEER' ||
            decoded.role === 'SHELTER' ||
            decoded.role === 'NONE')
        );
      };

      if (isDecodeToken(decoded)) {
        const decodedToken = decoded as DecodeToken;
        console.log(decodedToken);

        setAuthState((prevState: AuthState) => ({
          ...prevState,
          dangle_access_token,
          dangle_id: decodedToken.id,
          dangle_role: decodedToken.role
        }));
      }
    } else {
      if (!protectedRoutes.some(route => pathname.includes(route)))
        router.push('/');
    }
  }, [router, pathname]);

  const logout = useCallback(() => {
    cookie.remove(COOKIE_ACCESS_TOKEN_KEY);
    cookie.remove(COOKIE_REFRESH_TOKEN_KEY);
    setAuthState(initialAuthState);
  }, []);

  const { user, dangle_access_token, dangle_id, dangle_role } = authState;

  return (
    <AuthContext.Provider
      value={{
        user,
        dangle_access_token,
        dangle_id,
        dangle_role,
        setAuthState,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
