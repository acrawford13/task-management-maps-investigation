import { taskOverlaps, countOverlappingTasks, createUnavailability } from './calendar';

const taskA = {
  start_time: '2018-11-09T13:00:00Z',
  end_time: '2018-11-09T14:00:00Z',
};

const taskB = {
  start_time: '2018-11-09T13:30:00Z',
  end_time: '2018-11-09T14:30:00Z',
};

const taskC = {
  start_time: '2018-11-09T15:00:00Z',
  end_time: '2018-11-09T16:00:00Z',
};

const overlappingTask = {
  start_time: '2018-11-09T13:00:00Z',
  end_time: '2018-11-09T14:00:00Z',
};

const nonOverlappingTask = {
  start_time: '2018-11-09T12:00:00Z',
  end_time: '2018-11-09T13:00:00Z',
};

const existingTasks = [
  {
    start_time: '2018-11-09T13:30:00Z',
    end_time: '2018-11-09T13:40:00Z',
  },
  {
    start_time: '2018-11-09T13:00:00Z',
    end_time: '2018-11-09T13:30:00Z',
  },
];

describe('taskOverlaps', () => {
  it('returns true if the tasks overlap', () => {
    expect(taskOverlaps(taskA, taskB)).toEqual(true);
    expect(taskOverlaps(taskA, taskA)).toEqual(true);
  });

  it("returns false if tasks don't overlap", () => {
    expect(taskOverlaps(taskA, taskC)).toEqual(false);
  });
});

describe('countOverlappingTasks', () => {
  it('returns the count of overlapping tasks', () => {
    expect(countOverlappingTasks(overlappingTask, existingTasks)).toEqual(2);
    expect(countOverlappingTasks(nonOverlappingTask, existingTasks)).toEqual(0);
  });
});

describe('createUnavailability', () => {
  it("returns the provider's unavailability based on their availability and the calendar limits", () => {
    expect(
      createUnavailability({
        availability: [{ start_time: '2018-11-09T09:00:00Z', end_time: '2018-11-10T00:00:00Z' }],
        start_time: '2018-11-09T00:00:00Z',
        end_time: '2018-11-10T00:00:00Z',
      }),
    ).toEqual([{ start_time: '2018-11-09T00:00:00Z', end_time: '2018-11-09T09:00:00Z' }]);
  });

  it('returns an empty array if the provider is available all day', () => {
    expect(
      createUnavailability({
        availability: [{ start_time: '2018-11-09T07:00:00Z', end_time: '2018-11-10T00:00:00Z' }],
        start_time: '2018-11-09T07:00:00Z',
        end_time: '2018-11-10T00:00:00Z',
      }),
    ).toEqual([]);
  });

  it('returns the full calendar span if provider has no availability', () => {
    expect(
      createUnavailability({
        availability: [],
        start_time: '2018-11-09T07:00:00Z',
        end_time: '2018-11-10T00:00:00Z',
      }),
    ).toEqual([{ start_time: '2018-11-09T07:00:00Z', end_time: '2018-11-10T00:00:00Z' }]);
  });
});
