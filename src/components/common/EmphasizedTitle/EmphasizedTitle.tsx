import React, { ReactNode } from 'react';
import * as style from './EmphasizedTitle.css';
import clsx from 'clsx';
import { variants } from '../Typography/Typography.css';

const EmphasizedTitle = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <div aria-label="title" className={style.wrapper}>
      {children}
    </div>
  );
};
export default EmphasizedTitle;

export const Line = ({ children }: { children: ReactNode }) => (
  <div className={clsx([style.singleLine, variants.h2])}>{children}</div>
);

export const E = ({ children }: { children: string }) => (
  <div className={clsx([style.underBarContainer, variants.h2])}>
    <span className={style.underBarText}>{children}</span>
    <span className={clsx([style.underBar])} />
  </div>
);
