'use client';
import { Warning } from '@/asset/icons';
import { H2, H4 } from '@/components/common/Typography';
import useHeader from '@/hooks/useHeader';
import * as styles from './Unregister.css';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import clsx from 'clsx';
import { variants } from '@/components/common/Typography/Typography.css';
import useMyInfo from '@/api/mypage/useMyInfo';
import { UserRole } from '@/constants/user';
import { MyShelterInfo, MyVolInfo } from '@/api/mypage/mypage';
import LoadingIndicator from '../common/Button/LoadingIndicator';
import { useRouter } from 'next/navigation';
import { withdraw } from '@/api/volunteer/my/withdraw';
import useLogout from '@/api/mypage/useLogout';

interface UnregisterProps {
  role: UserRole;
}

export default function Unregister({ role }: UnregisterProps) {
  useHeader({ title: '회원 탈퇴' });
  const { data } = useMyInfo(role);
  const router = useRouter();
  const { mutate: logout } = useLogout();

  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck(prev => !prev);
  };

  const handleSubmint = async () => {
    console.log(12123);

    if (role === 'SHELTER') {
      //TODO: 보호소 탈퇴 api 호출
      console.log('보호소 탈퇴');
    } else {
      await withdraw();
    }
    logout();
    router.push('/');
  };

  if (!data) return <LoadingIndicator color="primary" />;

  const name =
    role === 'SHELTER'
      ? (data as MyShelterInfo).name + '보호소'
      : (data as MyVolInfo).nickName;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <H2>{`${name} 님`},</H2>
          <H2>정말 탈퇴하시겠어요?🥲</H2>
        </div>

        <article className={styles.articleWrapper}>
          <div className={styles.articleTitle}>
            <Warning /> <H4>댕글댕글 탈퇴 전 확인해주세요.</H4>
          </div>
          <div className={styles.content}>
            <ul className={styles.ul}>
              <li className={clsx([styles.li, variants.button2])}>
                지금 탈퇴하시면 참여 예정이거나 대기중인 봉사일정에 참여하실수
                없게 돼요.
              </li>
              <li className={clsx([styles.li, variants.button2])}>
                모든 데이터는 복구가 불가능해요.
              </li>
            </ul>
          </div>
        </article>
        <div className={styles.bottom}>
          <CheckBox
            value={check}
            onClick={handleCheck}
            label="위 내용을 모두 확인했으며, 동의해요."
          />

          <Button disabled={!check} onClick={handleSubmint}>
            탈퇴하기
          </Button>
        </div>
      </div>
    </>
  );
}
