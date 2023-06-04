import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Body2: React.FC<TypographyProps> = props => {
  return <p {...props} />;
};

export default withTypographyBase(Body2, 'body2');
