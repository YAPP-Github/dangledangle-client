import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const Caption2: React.FC<TypographyProps> = props => {
  return <span {...props} />;
};

export default withTypographyBase(Caption2, 'caption2');
