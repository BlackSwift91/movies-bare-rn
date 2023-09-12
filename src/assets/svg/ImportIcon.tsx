import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../theme';

const ImportIcon: FC = () => {
  return (
    <Svg width="24px" height="24px" viewBox="0 0 24 24">
      <Path
        d="M21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Zm-9.71,1.71a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l4-4a1,1,0,0,0-1.42-1.42L13,12.59V3a1,1,0,0,0-2,0v9.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z"
        fill={COLORS.BLACK}
      />
    </Svg>
  );
};

export default ImportIcon;
