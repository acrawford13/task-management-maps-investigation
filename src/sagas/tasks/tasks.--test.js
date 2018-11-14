import { filterProviders, filterProvidersByTravelTimeToTask } from './tasks';


const availableProvider = {
  name: 'Available',
  location: {
    lat: -35.286519,
    lng: 149.154050,
  },
  type: 'Cleaner',
  tasks: [
    {
      start_time: '2018-10-25T14:00:00.000Z',
      end_time: '2018-10-25T14:30:00.000Z'
    },
    {
      start_time: '2018-10-25T12:00:00.000Z',
      end_time: '2018-10-25T12:30:00.000Z'
    }
  ],
}

const unavailableProvider = {
  name: 'Unavailable',
  location: {
    lat: -35.286519,
    lng: 149.154050,
  },
  type: 'Cleaner',
  tasks: [
    {
      start_time: '2018-10-25T16:00:00.000Z',
      end_time: '2018-10-25T17:30:00.000Z'
    }
  ]
};

const closeAvailableProvider = {
  ...availableProvider,
  transitInfo: {
    routes: [
      {
        legs: [
          {
            duration: {
              value: 8620,
            }
          }
        ]
      }
    ]
  }
};

const farAvailableProvider = {
  ...availableProvider,
  transitInfo: {
    routes: [
      {
        legs: [
          {
            duration: {
              value: 7940,
            }
          }
        ]
      }
    ]
  }
}

const task = {
  id: 1,
  label: 'Cleaning at Hannaford St.',
  start_time: '2018-10-25T16:00:00.000Z',
  end_time: '2018-10-25T16:30:00.000Z',
  location: {
    lat: -35.239930,
    lng: 149.045936,
  },
  type: 'cleaning',
}

const providers = [availableProvider, unavailableProvider];
const providersWithTravelTime = [closeAvailableProvider, farAvailableProvider];

describe('filterProviders', () => {
  it('returns only providers who are available at the time of the task', () => {
    expect(filterProviders({ task, providers })).toEqual([availableProvider]);
  })
})
describe('filterProvidersByTravelTimeToTask', () => {
  it.only('returns only providers who can make it to the task on time', () => {
    expect(filterProvidersByTravelTimeToTask({ task, providers: providersWithTravelTime })).toEqual([closeAvailableProvider]);
  })
})