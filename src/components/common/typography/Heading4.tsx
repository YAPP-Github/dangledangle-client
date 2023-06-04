import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Heading4: React.FC<TypographyProps> = props => {
  return <h4 {...props} />;
};

export default withTypographyBase(Heading4, 'h4');
