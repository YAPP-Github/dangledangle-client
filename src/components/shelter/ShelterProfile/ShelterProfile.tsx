'use client';
import Image from 'next/image';
import { H3 } from '@/components/common/Typography';
import * as styles from './ShelterProfile.css';
import ShelterProfileEditButton from './ShelterProfileButton/ShelterProfileEditButton';
import { useAuthContext } from '@/providers/AuthContext';
import VolunteerFavoriteButtons from './VolunteerFavoriteButtons/VolunteerFavoriteButtons';
import useShelterHomeInfo from '@/api/shelter/{shelterId}/useShelterHomeInfo';
import Button from '@/components/common/Button/Button';

interface ProfileProps {
  shelterId: number;
  profileImageUrl: string;
  bookMarked?: boolean;
  name: string;
}
export default function ShelterProfile({
  profileImageUrl,
  name,
  bookMarked,
  shelterId
}: ProfileProps) {
  //TODO auth 상태 관리
  const auth = useAuthContext();
  const { data: shelterHomeInfo } = useShelterHomeInfo(shelterId);

  return (
    <>
      <div className={styles.wrapper}>
        <Image
          width={80}
          height={80}
          className={styles.profileImage}
          src={profileImageUrl || '/sparkle.png'}
          alt={`${name}-profile-image`}
        />
        <div className={styles.contents}>
          <H3>{name}</H3>

          {shelterHomeInfo ? (
            auth.dangle_role === 'SHELTER' ? (
              <ShelterProfileEditButton />
            ) : (
              <VolunteerFavoriteButtons
                bookMarked={
                  shelterHomeInfo === undefined
                    ? bookMarked
                    : shelterHomeInfo.bookMarked
                }
                shelterId={shelterId}
                bankAccount={shelterHomeInfo?.bankAccount}
              />
            )
          ) : (
            <Button loading={true} buttonColor="secondary" />
          )}
        </div>
      </div>
    </>
  );
}
