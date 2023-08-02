import React from 'react';
import { Body3, H4 } from '@/components/common/Typography';
import * as styles from './CarouselItem.css';
import Image from 'next/image';

interface CarouselItemProps {
  index: number;
  title: string;
  description: string;
}

const CarouselItem = ({ index, title, description }: CarouselItemProps) => {
  return (
    <div className={styles.item}>
      <Image
        key={`register_${index + 1}`}
        src={`/images/register/shelter_register_${index + 1}.png`}
        alt={`register_${index + 1}`}
        width={90}
        height={90}
        className={styles.image}
      />
      {index === 2 && (
        <Image
          key={`register_5`}
          src={`/images/register/shelter_register_5.png`}
          alt={`register_${index + 1}`}
          width={99}
          height={65}
          className={styles.extra}
        />
      )}
      <Body3 color="gray600" className={styles.carouselText}>
        {`0${index + 1}`}
      </Body3>
      <H4 color="gray900" style={{ marginBottom: '12px' }}>
        {title}
      </H4>
      <Body3 color="gray900" style={{ maxWidth: '220px' }}>
        {description}
      </Body3>
    </div>
  );
};

export default CarouselItem;
