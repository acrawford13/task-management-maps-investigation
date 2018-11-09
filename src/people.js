const providers = [
  {
    id: 1,
    name: 'John Smith',
    location: {
      lat: -35.286519,
      lng: 149.15405,
    },
    type: 'Cleaner',
    tasks: [],
    availability: [{ start_time: '2018-11-09T09:00:00Z', end_time: '2018-11-09T17:30:00Z' }],
  },
  {
    id: 2,
    name: 'David Argyle',
    location: {
      lat: -35.257575,
      lng: 149.077165,
    },
    type: 'Cleaner',
    tasks: [],
    availability: [
      { start_time: '2018-11-09T09:00:00Z', end_time: '2018-11-09T10:30:00Z' },
      { start_time: '2018-11-09T11:00:00Z', end_time: '2018-11-09T14:30:00Z' },
      { start_time: '2018-11-09T16:00:00Z', end_time: '2018-11-09T21:00:00Z' },
    ],
  },
  {
    id: 3,
    name: 'Rose Byrne',
    location: {
      lat: -35.211355,
      lng: 149.097708,
    },
    type: 'Cleaner',
    tasks: [],
    availability: [{ start_time: '2018-11-09T09:00:00Z', end_time: '2018-11-09T17:30:00Z' }],
  },
];

export default providers;
