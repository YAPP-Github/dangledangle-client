'use client';
import Carousel from '@/components/common/Carousel/Carousel';
import * as styles from './styles.css';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { useState } from 'react';
import Badge from '@/components/common/Badge/Badge';

export default function CarouselTest() {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ width: '100%' }}>
      <Carousel>
        <div className={styles.item} style={{ backgroundColor: 'red' }} />
        <div className={styles.item} style={{ backgroundColor: 'orange' }} />
        <div className={styles.item} style={{ backgroundColor: 'yellow' }} />
      </Carousel>
      <div style={{ marginBottom: '30px' }} />
      <CheckBox value={checked} onClick={setChecked} label="체크박스" />
      <div style={{ marginBottom: '30px' }} />
      <Badge type="primary">입력 완료</Badge>
      <Badge type="gray">입력 중</Badge>
    </div>
  );
}
