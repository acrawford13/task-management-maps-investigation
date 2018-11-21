import React from 'react';

const SvgFilterDefs = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <filter id="dropShadowFilter" x="0" y="0">
        <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
      </filter>
    </defs>
  </svg>
);

export default SvgFilterDefs;
