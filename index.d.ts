/**
 * @file 类方法声明
 * @author zhaoyadong
 */

declare class DateTime {
    constructor();
    constructor(value: number|string|Date);
    constructor(year: number, month: number, day?: number, hour?: number, minute?: number, second?: number);
    readonly instanceOfDate: Date;
    toString(format?: string): string;
    addYears(num: number): DateTime;
    addMonths(num: number): DateTime;
    addDays(num: number): DateTime;
    addHours(num: number): DateTime;
    addMinutes(num: number): DateTime;
    addSeconds(num: number): DateTime;
    getYears(): number;
    getMonths(): number;
    getDays(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    dayOfWeek(): number;
    dayOfYear(): number;
    weekOfYear(): number;
    daysOfMonth(): number;
    static now(): DateTime;
    static today(): DateTime;
    static daysInMonth(): number;
}

export = DateTime;