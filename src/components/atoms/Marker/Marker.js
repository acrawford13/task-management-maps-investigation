import React from 'react';
import styled from 'styled-components';

const Path = styled.path`
  fill: ${props => props.fill};
`;

const SVG = styled.svg`
  width: ${props => props.size}rem;
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
`;

const MarkerShape = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5fr 1fr;
  cursor: pointer;

  &::before {
    content: '';
    display: ${props => !props.selected && 'none'};
    box-sizing: border-box;
    width: ${props => props.size * 1.65}rem;
    height: ${props => props.size * 1.65}rem;
    transform: translate(-20%, -12.5%);
    border: 4px solid ${props => props.color};
    border-radius: 50%;
    position: absolute;
  }
`;

const Content = styled.div`
  width: ${props => props.size}rem;
  height: ${props => props.size}rem;
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Time = styled.span`
  font-weight: bold;
  font-size: ${props => props.size / 4}rem;
`;

const Marker = ({ size, color, selected, time, className }) => {
  return (
    <MarkerShape size={size} color={color} className={className} selected={selected}>
      <SVG size={size} viewBox="0 0 46 57">
        <Path
          d="M 46.00,23.37C 46.00,10.46 35.70,0.00 23.00,0.00 10.30,0.00 0.00,10.46 0.00,23.37 0.00,31.10 2.08,35.42 8.92,42.33 16.86,50.36 21.76,57.02 23.23,57.00 24.59,56.98 30.29,49.43 36.95,42.18 44.13,34.37 46.00,30.57 46.00,23.37 46.00,23.37 46.00,23.37 46.00,23.37 Z"
          fill={color}
        />
      </SVG>
      <Content size={size}>
        <Time size={size}>{time}</Time>
      </Content>
    </MarkerShape>
  );
};

Marker.defaultProps = {
  color: '#ff7277',
  size: 3.3125,
  selected: false,
};

export default Marker;
