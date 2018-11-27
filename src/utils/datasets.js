export const getDataset = () => {
  const DATASETS = {
    thursday: { name: 'thursday', center: { lat: 51.524351, lng: -0.147729 } },
    friday: { name: 'friday', center: { lat: 51.515514, lng: -0.150716 } },
  };

  return DATASETS[window.location.pathname.replace(/\//, '')] || DATASETS.friday;
};
