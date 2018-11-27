import moment from 'moment-timezone';
import { getDataset } from 'utils/datasets';

const dataset = getDataset();

export const taskOverlaps = (taskA, taskB) => {
  const taskAStart = moment.utc(taskA.start_time);
  const taskBStart = moment.utc(taskB.start_time);
  const taskAEnd = moment.utc(taskA.end_time);
  const taskBEnd = moment.utc(taskB.end_time);
  return (
    taskAStart.isBetween(taskBStart, taskBEnd, 'minute', '[)') ||
    taskAEnd.isBetween(taskBStart, taskBEnd, 'minute', '(]') ||
    taskBStart.isBetween(taskAStart, taskAEnd, 'minute', '[)') ||
    taskBEnd.isBetween(taskAStart, taskAEnd, 'minute', '(]')
  );
};

export const countOverlappingTasks = (task, existingTasks) => {
  return existingTasks.filter(existingTask => {
    return taskOverlaps(task, existingTask);
  }).length;
};

export const createUnavailability = ({
  availability,
  start_time = dataset.start_time,
  end_time = dataset.end_time,
}) => {
  const tempAvailability = [...availability];
  if (availability.length === 0) {
    return [{ start_time, end_time }];
  }
  if (moment.utc(tempAvailability[0].start_time).isAfter(moment.utc(start_time))) {
    tempAvailability.unshift({ start_time, end_time: start_time });
  }
  if (moment.utc(tempAvailability[tempAvailability.length - 1].end_time).isBefore(moment.utc(end_time))) {
    tempAvailability.push({ start_time: end_time, end_time });
  }
  const unavailability = tempAvailability
    .map((available, index) => {
      if (tempAvailability[index - 1]) {
        return {
          start_time: tempAvailability[index - 1].end_time,
          end_time: available.start_time,
        };
      }
    })
    .filter(value => value);

  return unavailability;
};

export const timeSort = (a, b) => {
  const aStart = moment.utc(a.start_time);
  const bStart = moment.utc(b.start_time);
  if (aStart.isBefore(bStart)) {
    return -1;
  }
  if (bStart.isBefore(aStart)) {
    return 1;
  }
  return 0;
};
