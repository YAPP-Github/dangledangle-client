import { Body3, H4 } from '@/components/common/Typography';
import React from 'react';
import * as styles from './CarouselItem.css';

interface CarouselItemProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  index: number;
  title: string;
  description: (string | React.JSX.Element)[];
}

const CarouselItem = ({
  icon: Icon,
  index,
  title,
  description
}: CarouselItemProps) => {
  return (
    <div className={styles.item}>
      <Icon />
      <Body3 color="gray600" className={styles.carouselText}>
        {`0${index + 1}`}
      </Body3>
      <H4 color="gray900" style={{ marginBottom: '12px' }}>
        {title}
      </H4>
      <Body3 color="gray900" style={{ maxWidth: '220px' }}>
        {description as string[]}
      </Body3>
    </div>
  );
};

export default CarouselItem;
