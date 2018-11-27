export const getDataset = () => {
  const DATASETS = {
    thursday: {
      name: 'thursday',
      start_time: '2018-11-29T00:00:00Z',
      end_time: '2018-11-30T00:00:00Z',
      center: { lat: 51.524351, lng: -0.147729 },
    },
    friday: {
      name: 'friday',
      start_time: '2018-11-30T00:00:00Z',
      end_time: '2018-12-01T00:00:00Z',
      center: { lat: 51.515514, lng: -0.150716 },
    },
  };

  return DATASETS[window.location.pathname.replace(/\//, '')] || DATASETS.friday;
};
