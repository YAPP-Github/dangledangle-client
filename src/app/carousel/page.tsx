'use client';
import Carousel from '@/components/common/Carousel/Carousel';
import * as styles from './styles.css';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { useState } from 'react';
import Badge from '@/components/common/Badge/Badge';
import Accordion from '@/components/common/Accordion/Accordion';
import { palette } from '@/styles/color';

export default function CarouselTest() {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: '100%' }}>
      <Carousel>
        {new Array(5).fill(0).map((_value, idx) => (
          <div key={idx} className={styles.item}>
            {idx}
          </div>
        ))}
      </Carousel>
      <div style={{ marginBottom: '80px' }} />
      <div className={styles.checkBoxDemo}>
        <CheckBox value={checked} onClick={setChecked} label="CheckBox" />
        <CheckBox
          disabled
          value={checked}
          onClick={setChecked}
          label="Disabled CheckBox"
        />
      </div>
      <div style={{ marginBottom: '80px' }} />
      <Accordion
        title="Accordion Title"
        open={open}
        onClick={() => setOpen(!open)}
        titleSuffix={<Badge type="primary">suffix</Badge>}
      >
        <div className={styles.accordionBody}>Accordion Children</div>
      </Accordion>
    </div>
  );
}
