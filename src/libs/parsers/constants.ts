import { DayOfWeek } from './types';

export const OPENING_HOUR_MAPPED_ATTRIBUTES = [
  {
    day: DayOfWeek.Mon,
    fields: [
      `${DayOfWeek.Mon.toLowerCase()}_open_time`,
      `${DayOfWeek.Mon.toLowerCase()}_close_time`
    ]
  },
  {
    day: DayOfWeek.Tue,
    fields: [
      `${DayOfWeek.Tue.toLowerCase()}_open_time`,
      `${DayOfWeek.Tue.toLowerCase()}_close_time`
    ]
  },
  {
    day: DayOfWeek.Wed,
    fields: [
      `${DayOfWeek.Wed.toLowerCase()}_open_time`,
      `${DayOfWeek.Wed.toLowerCase()}_close_time`
    ]
  },
  {
    day: DayOfWeek.Thu,
    fields: [
      `${DayOfWeek.Thu.toLowerCase()}_open_time`,
      `${DayOfWeek.Thu.toLowerCase()}_close_time`
    ]
  },
  {
    day: DayOfWeek.Fri,
    fields: [
      `${DayOfWeek.Fri.toLowerCase()}_open_time`,
      `${DayOfWeek.Fri.toLowerCase()}_close_time`
    ]
  },
  {
    day: DayOfWeek.Sat,
    fields: [
      `${DayOfWeek.Sat.toLowerCase()}_open_time`,
      `${DayOfWeek.Sat.toLowerCase()}_close_time`
    ]
  },
  {
    day: DayOfWeek.Sun,
    fields: [
      `${DayOfWeek.Sun.toLowerCase()}_open_time`,
      `${DayOfWeek.Sun.toLowerCase()}_close_time`
    ]
  }
];
