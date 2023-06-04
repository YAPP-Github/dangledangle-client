import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Heading3: React.FC<TypographyProps> = props => {
  return <h3 {...props} />;
};

export default withTypographyBase(Heading3, 'h3');
