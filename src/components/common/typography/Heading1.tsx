import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Heading1: React.FC<TypographyProps> = props => {
  return <h1 {...props} />;
};

export default withTypographyBase(Heading1, 'h1');
