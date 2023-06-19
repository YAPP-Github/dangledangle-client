/** 유저가 DB에 등록되지 않은 경우 */
export const UNREGISTERED = 'STORAGE-001';
// 이 아래는 임시
export const TOKEN_EXPIRED = 'STORAGE-002';
export const UNAUTORIZED = 'STORAGE-003';

export type AuthErrorCodeKeys =
  | typeof UNREGISTERED
  | typeof TOKEN_EXPIRED
  | typeof UNAUTORIZED;
