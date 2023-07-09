'use client';

import Image from 'next/image';
import { H3 } from '../common/Typography';
import * as styles from './ShelterProfile.css';
import VolunteerFavoriteButtons from './VolunteerFavoriteButtons';
import ShelterProfileEditButton from './ShelterProfileEditButton';
import { useAuthContext } from '@/providers/AuthContext';

interface ProfileProps {
  imageSrc: string;
  shelterName: string;
  donation: string;
}
export default async function ShelterProfile({
  imageSrc,
  shelterName,
  donation
}: ProfileProps) {
  //TODO auth 상태 관리
  const auth = useAuthContext();
  const isShelterUser = 'shelterId' in auth.user; //shelterId가 있으면 True

  return (
    <>
      <div className={styles.wrapper}>
        <Image
          width={80}
          height={80}
          className={styles.profileImage}
          src={imageSrc}
          alt={`${shelterName}-profile-image`}
        />
        <div className={styles.contents}>
          <H3>{shelterName}</H3>
          {isShelterUser ? (
            <ShelterProfileEditButton />
          ) : (
            <VolunteerFavoriteButtons donation={donation} />
          )}
        </div>
      </div>
    </>
  );
}
