import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Heading2: React.FC<TypographyProps> = props => {
  return <h2 {...props} />;
};

export default withTypographyBase(Heading2, 'h2');
