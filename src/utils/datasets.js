export const getDataset = () => {
  const DATASETS = {
    thursday: {
      name: 'thursday',
      start_time: '2018-11-29T07:00:00Z',
      end_time: '2018-11-30T07:00:00Z',
      center: { lat: 51.524351, lng: -0.147729 },
    },
    friday: {
      name: 'friday',
      start_time: '2018-11-30T07:00:00Z',
      end_time: '2018-12-01T07:00:00Z',
      center: { lat: 51.515514, lng: -0.150716 },
    },
    paris: {
      name: 'paris',
      start_time: '2018-11-01T07:00:00Z',
      end_time: '2018-11-02T07:00:00Z',
      center: { lat: 48.86251, lng: 2.337882 },
    },
    cleaning: {
      name: 'cleaning',
      start_time: '2018-12-01T07:00:00Z',
      end_time: '2018-12-02T07:00:00Z',
      center: { lat: 51.515514, lng: -0.150716 },
    },
  };

  return DATASETS[window.location.pathname.replace(/\//, '')] || DATASETS.friday;
};
