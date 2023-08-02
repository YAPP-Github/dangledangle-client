'use client';
import { Body1, ButtonText2 } from '@/components/common/Typography';
import * as styles from './LogoutSection.css';
import useLogout from '@/api/mypage/useLogout';
import useDialog from '@/hooks/useDialog';

interface LogoutSectionProps {}

export default function LogoutSection({}: LogoutSectionProps) {
  const { mutate: logout } = useLogout();
  const { dialogOn, dialogOff } = useDialog();
  const handleLogout = async () => {
    dialogOn({
      message: '로그아웃 하시겠습니까?',
      close: {},
      confirm: {
        text: '로그아웃',
        onClick: () => {
          dialogOff();
          logout();
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.accountBox}>
        <Body1 color="error" onClick={handleLogout}>
          로그아웃
        </Body1>
      </div>

      <div className={styles.btnWrapper}>
        <ButtonText2 color="gray400" className={styles.btnTxt}>
          회원탈퇴
        </ButtonText2>
      </div>
    </div>
  );
}
