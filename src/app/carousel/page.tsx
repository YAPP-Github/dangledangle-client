'use client';
import Carousel from '@/components/common/Carousel/Carousel';
import * as styles from './styles.css';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { useState } from 'react';
import Badge from '@/components/common/Badge/Badge';
import Accordion from '@/components/common/Accordion/Accordion';

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
      <Accordion
        title="필수 정보"
        open={checked}
        onClick={() => setChecked(!checked)}
        titleSuffix={<Badge type="primary">입력 완료</Badge>}
      >
        <div style={{ backgroundColor: 'grey', height: '600px' }} />
      </Accordion>
    </div>
  );
}
