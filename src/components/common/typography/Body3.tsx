import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Body3: React.FC<TypographyProps> = props => {
  return <p {...props} />;
};

export default withTypographyBase(Body3, 'body3');
