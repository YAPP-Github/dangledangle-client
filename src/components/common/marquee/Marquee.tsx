import * as style from './Marquee.css';
import { H1 } from '../typography';
import clsx from 'clsx';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface MarqueeProps {
  children: React.ReactNode;
  duration?: number;
}

export default function Marquee({ children, duration = 5 }: MarqueeProps) {
  return (
    <div
      aria-label="marquee"
      className={clsx([style.wrapper])}
      style={assignInlineVars({ [style.marqueeDuration]: `${duration}s` })}
    >
      <H1 className={style.marquee({ start: 1 })}>{children}</H1>
      <H1 className={style.marquee({ start: 2 })}>{children}</H1>
    </div>
  );
}
