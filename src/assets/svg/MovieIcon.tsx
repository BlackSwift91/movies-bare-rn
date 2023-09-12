import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../theme';

const MovieIcon: FC<{ focused: boolean }> = ({ focused }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"
        fill={focused ? COLORS.GREEN : COLORS.GRAY}
        fillOpacity={1}
      />
    </Svg>
  );
};

export default MovieIcon;
