import { css } from 'styled-components';
import { fromJS } from 'immutable';

const theme = {};

theme.colors = {
  // turquoise: '#2CC5D7',
  // darkCyan: '#1F8A96',
  // mediumTurquoise: '#50E3C2',
  // neonCarrot: '#FFA538',
  // tomato: '#FF5252',
  // bittersweet: '#F16664',
  // splashedWhite: '#FCFCFC',
  // ghostWhite: '#F7F8FC',
  // isabelline: '#EBEBEB',
  // grey: '#BBBBBB',
  // battleshipGrey: '#828282',
  // quartz: '#4A4A4A',
  // white: '#FFFFFF',
  grey: '#dbdbdb',
  paleTomato: '#ff7277',
  quartz: '#4A4A4A'
};

theme.palette = {
  primary: {
    default: theme.colors.turquoise,
    dark: theme.colors.darkCyan,
  },
  danger: {
    default: theme.colors.tomato,
    dark: theme.colors.bittersweet,
  },
  blurOverlay: 'rgba(216, 216, 216, 0.6)',
};

theme.font = {
  family: {
    default: "'Fira Sans', sans-serif",
  },
};

theme.transitions = {
  default: 'all 0.3s ease-in-out',
  fast: 'all 0.2s ease-in-out',
  shadow: {
    default: 'box-shadow 0.3s ease-in-out',
    fast: 'box-shadow 0.2s ease-in-out',
  },
};

theme.icons = {
  scale: (original, size) => {
    if (typeof size === 'string' && size.match(/r?em$/)) {
      size = +size.replace(/[^\d.]/g, '') * 16;
    }
    return original * +size / 120;
  },
};

theme.buttons = {
  shadowColor: hex => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(
          ${parseInt(result[1], 16)},
          ${parseInt(result[2], 16)},
          ${parseInt(result[3], 16)},
          0.1)`
      : null;
  },
};

theme.helpers = {
  rem: size => {
    if (typeof size === 'string' && size.match(/r?em$/)) {
      return size;
    }
    return +('' + size).replace(/[^\d.]/g, '') / 16 + 'rem';
  },
  parseColor: value => {
    if (value && value.match(/^theme\./)) {
      const path = value.replace('theme.', '').split('.');
      return fromJS(theme).getIn(path);
    }
    return value;
  },
};

theme.shadows = {
  big: '0.125rem 0.8125rem 0.6875rem rgba(0, 0, 0, 0.1)',
  default: '0 0.375rem 0.6875rem rgba(0, 0, 0, 0.07)',
  small: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.05)',
  modal: '0 0.3125rem 0.8125rem rgba(0, 0, 0, 0.07)',
  focus: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.25)',
  iconButton: size => {
    return `
      0
      ${theme.icons.scale(0.3125, size)}rem
      ${theme.icons.scale(0.8125, size)}rem
      rgba(0, 0, 0, 0.07)`;
  },
  iconButtonHover: size => {
    return `
      ${theme.icons.scale(0.125, size)}rem
      ${theme.icons.scale(0.8125, size)}rem
      ${theme.icons.scale(0.6875, size)}rem
      rgba(0, 0, 0, 0.1)`;
  },
  buttons: color => {
    const rgba = theme.buttons.shadowColor(color);
    return `
      0.125rem
      0.8125rem
      0.6875rem
      ${rgba}`;
  },
};

theme.sizes = {
  desktop: 1439,
  tablet: 1023,
  mobile: 767,
  mobileSmall: 479,
};

theme.media = Object.keys(theme.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${theme.sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default theme;
