export const getDataset = () => {
  const DATASETS = {
    thursday: { name: 'thursday' },
    friday: { name: 'friday' },
  };

  return DATASETS[window.location.pathname.replace(/\//, '')] || DATASETS.friday;
};
