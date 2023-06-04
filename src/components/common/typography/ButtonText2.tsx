import React from 'react';
import { TypographyProps, withTypographyBase } from './base';

const ButtonText2: React.FC<TypographyProps> = props => {
  return <span {...props} />;
};

export default withTypographyBase(ButtonText2, 'button2');
