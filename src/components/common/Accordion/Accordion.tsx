import { H4 } from '@/components/common/typography';
import clsx from 'clsx';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as styles from './Accordion.css';
import Image from 'next/image';
import IconArrowDown from '/public/icons/Arrow-Down.svg';

interface AccordionProps extends PropsWithChildren {
  title: string;
  titleSuffix?: React.ReactElement;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  titleSuffix,
  children
}) => {
  const [open, setOpen] = useState(false);
  const bodyWrapperRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyWrapperRef.current || !bodyRef.current) return;
    const height = open ? bodyRef.current.offsetHeight + 'px' : '0px';
    bodyWrapperRef.current.style.height = height;
  }, [open]);

  return (
    <div className="accordion">
      <div className={styles.header} onClick={() => setOpen(!open)}>
        <div className={styles.titleWrapper}>
          <H4>{title}</H4>
          {titleSuffix}
        </div>
        {/* TODO: svg 최적화 */}
        <Image
          alt="icon"
          src={IconArrowDown}
          className={clsx(styles.iconArrow, { reversed: open })}
        />
      </div>
      <div
        ref={bodyWrapperRef}
        className={clsx(styles.bodyWrapper, open ? 'open' : 'close')}
      >
        <div ref={bodyRef} className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
