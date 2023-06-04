import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Body1: React.FC<TypographyProps> = props => {
  return <p {...props} />;
};

export default withTypographyBase(Body1, 'body1');
