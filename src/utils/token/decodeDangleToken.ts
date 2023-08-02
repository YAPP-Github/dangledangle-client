import * as jwt from 'jsonwebtoken';
import { UserRole } from '@/constants/user';

interface DecodeToken extends jwt.JwtPayload {
  email: string;
  exp: number;
  iat: number;
  id: number;
  role: UserRole;
}
export default function decodeDangleToken(dangle_access_token: string) {
  try {
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

    if (!isDecodeToken(decoded)) {
      throw 'Invalid token';
    }

    return {
      dangle_id: decoded.id,
      dangle_role: decoded.role
    };
  } catch {
    return {
      dangle_id: null,
      dangle_role: 'NONE'
    };
  }
}
