import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../theme';

const ArrowUpIcon: FC = () => {
  return (
    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <Path
        d="M8.04319 6C8.85088 6 9.32534 5.09197 8.86409 4.42893L6.23146 0.644519C5.63468 -0.213353 4.36552 -0.213349 3.76874 0.64452L1.1361 4.42894C0.674861 5.09197 1.14932 6 1.95701 6H8.04319Z"
        fill={COLORS.GREEN}
      />
    </Svg>
  );
};

export default ArrowUpIcon;
