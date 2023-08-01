/** 유저가 DB에 등록되지 않은 경우 */
export enum ExceptionCode {
  /** API-000 / 서버에서 알 수 없는 치명적인 에러 발생  */
  FATAL_ERROR = 'API-000',
  /** API-001 / 서버에서 핸들링 하지 않은 에러 발생  */
  UNHANDLED_ERROR = 'API-001',
  /** API-002 / 인증되지 않은 사용자 / 만료된 토큰입니다. 다시 로그인을 진행해주세요.  */
  UNAUTHENTICATED = 'API-002',
  /** API-003 / 인가되지 않은 사용자 */
  UNAUTHORIZED = 'API-003',
  /** STOREAGE-001 / DB에서 해당하는 데이터를 찾을 수 없음 */
  DATA_NOT_FOUND_IN_DB = 'STORAGE-001'
}
