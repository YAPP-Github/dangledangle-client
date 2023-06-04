import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Body4: React.FC<TypographyProps> = props => {
  return <p {...props} />;
};

export default withTypographyBase(Body4, 'body4');
