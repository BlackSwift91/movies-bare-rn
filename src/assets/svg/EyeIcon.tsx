import React, {FC} from 'react';

import Svg, {Path} from 'react-native-svg';
import { COLORS } from '../theme';

const EyeIconSvg: FC = () => {
  return (
    <Svg width={20} height={13} viewBox="0 0 20 13" fill="none">
      <Path
        d="M10 4.005a4 4 0 110 8 4 4 0 010-8zM10 .5c4.614 0 8.596 3.15 9.701 7.564a.75.75 0 11-1.455.365 8.503 8.503 0 00-16.493.004.75.75 0 01-1.455-.363A10.003 10.003 0 0110 .5z"
        fill={COLORS.LIGHT_GRAY}
        fillOpacity={1}
      />
    </Svg>
  );
};

export default EyeIconSvg;
