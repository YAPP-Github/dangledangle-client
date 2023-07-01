'use client';

import Image from 'next/image';
import { H3 } from '../common/Typography';
import * as styles from './ShelterProfile.css';
import AddFavoriteButtons from './AddFavoriteButtons';
import EditShelterProfileButton from './EditShelterProfileButton';
import { useAuthContext } from '@/providers/AuthContext';

interface ProfileProps {
  imageSrc: string;
  shelterName: string;
  donation: string;
}
export default function ShelterProfile({
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
            <EditShelterProfileButton />
          ) : (
            <AddFavoriteButtons donation={donation} />
          )}{' '}
        </div>
      </div>
    </>
  );
}
