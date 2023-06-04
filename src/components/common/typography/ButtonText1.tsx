import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const ButtonText1: React.FC<TypographyProps> = props => {
  return <span {...props} />;
};

export default withTypographyBase(ButtonText1, 'button1');
