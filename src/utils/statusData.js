import theme from 'components/themes/theme';

export default {
  assigned: {
    color: theme.colors.webOrange,
    fadeColor: theme.colors.desaturatedWebOrange,
    label: 'Assigned',
    taskListOrder: 1,
  },
  not_assigned: {
    color: theme.colors.flamePea,
    fadeColor: theme.colors.desaturatedFlamePea,
    label: 'Not assigned',
    taskListOrder: 0,
  },
};
