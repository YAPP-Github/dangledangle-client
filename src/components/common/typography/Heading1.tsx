import React from 'react';
import { h1 } from './Typography.css';
import classNames from 'classnames';

interface Heading1Props
  extends React.PropsWithChildren,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    > {}

const Heading1: React.FC<Heading1Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h1 className={classNames(className, h1)} {...props}>
      {children}
    </h1>
  );
};

export default Heading1;
