import React, {FC} from 'react';

import Svg, {Path} from 'react-native-svg';
import { COLORS } from '../theme';

const ArrowDownIcon: FC = () => {
  return (
    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none">
    <Path d="M1.95681 0C1.14912 0 0.674663 0.90803 1.13591 1.57107L3.76854 5.35548C4.36532 6.21335 5.63448 6.21335 6.23126 5.35548L8.8639 1.57106C9.32514 0.908027 8.85068 0 8.04299 0H1.95681Z"
    fill={COLORS.GREEN}
    />
    </Svg>
  );
};

export default ArrowDownIcon;




