import React from 'react';
import * as Icons from '@mui/icons-material';

interface IconProps {
  iconName: string;
}

const Icon: React.FC<IconProps> = ({ iconName }) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];

    if (!IconComponent) {
      return null; 
    }
  
    return <IconComponent />;
};

export default Icon;
