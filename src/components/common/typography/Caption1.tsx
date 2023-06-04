import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Caption1: React.FC<TypographyProps> = props => {
  return <span {...props} />;
};

export default withTypographyBase(Caption1, 'caption1');
