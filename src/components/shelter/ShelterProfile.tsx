'use client';

import Image from 'next/image';
import { H3 } from '../common/Typography';
import Button from '../common/Button/Button';
import { palette } from '@/styles/color';
import * as styles from './ShelterProfile.css';

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

          <div className={styles.buttons}>
            <Button
              buttonColor="secondary"
              size="small"
              color={palette.gray800}
            >
              즐겨찾기
            </Button>
            <Button
              buttonColor="secondary"
              size="small"
              variant="line"
              color="white"
            >
              간편후원
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
