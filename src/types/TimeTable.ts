export const enum WeekDay {
    MONDAY = 'mon',
    TUESDAY = 'tue',
    WEDNESDAY = 'wed',
    THURSDAY = 'thu',
    FRIDAY = 'fri',
    SATURDAY = 'sat',
    SUNDAY = 'sun'
}

export default interface Timetable {
    day: WeekDay;
    openTime: string;
    closeTime: string;
}
