import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';

const TitleIcon: FC = () => {
  return (
    <Svg viewBox="0 0 1024 1024" height="24px" width="24px">
      <Path d="M213.333333 170.666667v128h234.666667v512h128V298.666667h234.666667V170.666667z" />
    </Svg>
  );
};

export default TitleIcon;
