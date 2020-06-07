/**
 * @file 日期类对象
 * @author zhaoyadong
 */

export default class DateTime {
    /**
     * 构造函数
     * @param year 年
     * @param month 月
     * @param day 日
     * @param hours 小时
     * @param minutes 分钟
     * @param seconds 秒
     * @param milliseconds 毫秒
     */
    public constructor(
        year?: number | string | Date,
        month?: number,
        day?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number
    ) {
        if (!year) {
            this._date = new Date();
        } else {
            if (arguments.length === 1) {
                this._date = new Date(year);
            } else {
                // console.log(typeof(year));
                switch (typeof year) {
                    case 'number':
                        let _month: number = month == null ? 1 : month;
                        this._date = new Date(
                            year,
                            _month - 1,
                            day || 1,
                            hours || 0,
                            minutes || 0,
                            seconds || 0,
                            milliseconds || 0
                        );
                        break;
                    default:
                        this._date = new Date(year);
                        break;
                }
            }
        }
        this.instanceOfDate = this._date;
    }

    private _date: Date = null;

    /**
     * 当前的Date类型内置对象
     */
    public readonly instanceOfDate: Date = null;

    /**
     * 获取年份
     */
    getYears(): number {
        return this._date.getFullYear();
    }

    /**
     * 获取月份
     */
    getMonths(): number {
        return this._date.getMonth() + 1;
    }

    /**
     * 获取天数
     */
    getDays(): number {
        return this._date.getDate();
    }

    /**
     * 获取小时
     */
    getHours(): number {
        return this._date.getHours();
    }

    /**
     * 获取分钟
     */
    getMinutes(): number {
        return this._date.getMinutes();
    }

    /**
     * 获取秒数
     */
    getSeconds(): number {
        return this._date.getSeconds();
    }

    /**
     * 获取毫秒秒数
     */
    getMilliseconds(): number {
        return this._date.getMilliseconds();
    }

    /**
     * 可返回一周（0~6）的某一天的数字。注: 星期天为 0, 星期一为 1, 以此类推。
     */
    dayOfWeek(): number {
        return this._date.getDay();
    }

    /**
     * 获取该实例所表示的日期是一年的第几天
     */
    dayOfYear(): number {
        const currentYear: number = this.getYears();
        // 今天减今年的第一天（xxxx年01月01日）
        const hasTimestamp: number =
            this._date.getTime() - new Date(currentYear, 0, 1).getTime();
        // 86400000 = 24 * 60 * 60 * 1000
        const hasDays = Math.ceil(hasTimestamp / 86400000);
        return hasDays;
    }

    /**
     * 获取该实例所表示的日期所在一年中的第几周
     */
    weekOfYear(): number {
        let firstDay = new Date(this.getYears(), 0, 1);
        let dayOfWeek = firstDay.getDay();
        let spendDay = 1;
        if (dayOfWeek != 0) {
            spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(this.getYears(), 0, 1 + spendDay);
        let d = Math.ceil(
            (this.instanceOfDate.valueOf() - firstDay.valueOf()) / 86400000
        );
        let result = Math.ceil(d / 7);
        return result + 1;
    }

    /**
     * 获取当前月的天数
     */
    daysOfMonth(): number {
        const year: number = this.getYears();
        switch (this.getMonths()) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                // 闰年判断
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    return 29;
                } else {
                    return 28;
                }
        }
        // 默认31
        return 31;
    }

    /**
     * 格式化日期
     * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数，fff-代表3位毫秒数 -是可替换字符
     */
    toString(format?: string): string {
        format = format || 'yyyy-MM-dd';
        const z = {
            y: this.getYears(),
            M: this.getMonths(),
            d: this.getDays(),
            h: this.getHours(),
            m: this.getMinutes(),
            s: this.getSeconds(),
            f: this.getMilliseconds(),
        };
        return format.replace(/(y+|M+|d+|h+|m+|s+|f+)/g, (v) => {
            return ((v.length > 1 ? '0' : '') + eval('z. ' + v.slice(-1))).slice(
                -(v.length > 2 ? v.length : 2)
            );
        });
    }

    /**
     * 判断是否为闰年
     * @param year 年份
     */
    isLeapYear(): boolean {
        return DateTime.isLeapYear(this.getYears());
    }

    /**
     * 增加年份，构建一个新的日期
     * @param num 年份数量
     */
    addYears(num: number): DateTime {
        let year: number = this.getYears();
        year = year > 0 ? year : 1;
        year += num;
        let month: number = this.getMonths();
        let day: number = this.getDays();

        if (month === 2 && day === 29) {
            if (!DateTime.isLeapYear(year)) {
                // 如果是平年，则取28日，为最后一天
                day = 28;
            }
        }
        let hours: number = this.getHours();
        let minutes: number = this.getMinutes();
        let seconds: number = this.getSeconds();
        let milliseconds: number = this.getMilliseconds();
        return new DateTime(
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        );
    }

    /**
     * 增加月份，构建一个新的日期
     * @param num 月份数量
     */
    addMonths(num: number): DateTime {
        let year: number = this.getYears();
        year = year > 0 ? year : 1;
        let month: number = this.getMonths() + num;

        let newDate: Date = new Date(year, month - 1, 1);
        let newMonth: number = newDate.getMonth() + 1;
        let newYear: number = newDate.getFullYear();

        let day: number = this.getDays();
        if (day === 31 || day === 30 || day === 29) {
            let day31: number[] = [1, 3, 5, 7, 8, 10, 12];
            let day30: number[] = [4, 6, 9, 11];
            let day29: number[] = [2];

            if (day === 31) {
                if (day29.includes(newMonth)) {
                    if (DateTime.isLeapYear(newYear)) {
                        day = 29;
                    } else {
                        day = 28;
                    }
                } else if (day30.includes(newMonth)) {
                    day = 30;
                }
            } else if (day === 30) {
                if (day29.includes(newMonth)) {
                    if (DateTime.isLeapYear(newYear)) {
                        day = 29;
                    } else {
                        day = 28;
                    }
                }
            } else {
                if (!DateTime.isLeapYear(newYear)) {
                    day = 28;
                }
            }
        }
        let hours: number = this.getHours();
        let minutes: number = this.getMinutes();
        let seconds: number = this.getSeconds();
        let milliseconds: number = this.getMilliseconds();
        return new DateTime(
            newYear,
            newMonth,
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        );
    }

    /**
     * 增加天数，构造一个新的日期
     * @param num 天数量
     */
    addDays(num: number): DateTime {
        let addMillis: number = num * 24 * 60 * 60 * 1000;
        let time: number = this.getTime();
        return new DateTime(time + addMillis);
    }

    /**
     * 增加小时，构造一个新的日期
     * @param num 小时数量
     */
    addHours(num: number): DateTime {
        let addMillis: number = num * 60 * 60 * 1000;
        let time: number = this.getTime();
        return new DateTime(time + addMillis);
    }

    /**
     * 增加分钟，构造一个新的日期
     * @param num 分钟数量
     */
    addMinutes(num: number): DateTime {
        let addMillis: number = num * 60 * 1000;
        let time: number = this.getTime();
        return new DateTime(time + addMillis);
    }

    /**
     * 增加秒数，构造一个新的日期
     * @param num 秒数数量
     */
    addSeconds(num: number): DateTime {
        let addMillis: number = num * 1000;
        let time: number = this.getTime();
        return new DateTime(time + addMillis);
    }

    /**
     * 增加毫秒数，构造一个新的日期
     * @param num 毫秒数数量
     */
    addMilliseconds(num: number): DateTime {
        let addMillis: number = num;
        let time: number = this.getTime();
        return new DateTime(time + addMillis);
    }

    /**
     * 和另外一个日期对象比较，是否相同日期
     * @param compareDate
     * @return 返回true或false
     */
    compareTo(compareDate: DateTime): boolean {
        return (
            this.toString('yyyy-MM-dd hh:mm:ss.fff') ===
            compareDate.toString('yyyy-MM-dd hh:mm:ss.fff')
        );
    }

    /**
     * 与一个日期对象差的天数，不足一天舍弃不计算，并且不区分正负，返回一个正整数
     * @param compareDate 比较的日期
     * @return 返回一个正整数，不关心谁大
     */
    diffDays(compareDate: DateTime): number {
        let diff: number = Math.abs(
            this.instanceOfDate.getTime() - compareDate.instanceOfDate.getTime()
        );
        let result = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
        return result;
    }

    /**
     * 获取时间戳，单位：毫秒
     * @return 返回一个正整数，单位：毫秒
     */
    getTime(): number {
        return this._date.getTime();
    }

    /**
     * 格式化显示距离当前日期已经过去多少时间
     * @return 返回一个字符串
     */
    formatPassTime(): string {
        return DateTime.formatPassTime(this._date);
    }

    /**
     * 今天
     */
    static today(): DateTime {
        let date = new Date();

        let dt = new DateTime(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );
        // console.log(167, date.getFullYear(), date.getMonth() + 1, date.getDate(), dt);
        return dt;
    }

    /**
     * 当前时间
     */
    static now(): DateTime {
        let date = new Date();

        let dt = new DateTime(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        );
        // console.log(167, date.getFullYear(), date.getMonth() + 1, date.getDate(), dt);
        return dt;
    }

    /**
     * 获取某年某月的天数
     */
    static daysInMonth(year: number, month: number): number {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                // 闰年判断
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    return 29;
                } else {
                    return 28;
                }
        }
        // 默认31
        return 31;
    }

    /**
     * 判断是否为闰年
     * @param year 年份
     */
    static isLeapYear(year: number): boolean {
        if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
            // console.log('闰年');
            return true;
        } else {
            // console.log('平年');
            return false;
        }
    }

    /**
     * 格式化现在的已过时间
     * @param  startTime {Date} 开始时间
     * @return {String}
     */
    static formatPassTime(startTime: DateTime | Date): string {
        
        let sTime: Date = null;
        if (startTime instanceof DateTime) {
            sTime = startTime.instanceOfDate;
        } else if (startTime instanceof Date){
            sTime = startTime;
        } else {
            return '';
        }
        let st: number = sTime.getTime();
        let currentTime: number = new Date().getTime(),
            time: number = currentTime - st,
            day: number = Math.round(time / (1000 * 60 * 60 * 24)),
            hour: number = Math.round(time / (1000 * 60 * 60)),
            min: number = Math.round(time / (1000 * 60)),
            month: number = Math.round(day / 30),
            year: number = Math.round(month / 12);
        if (year) return year + '年前';
        if (month) return month + '个月前';
        if (day) return day + '天前';
        if (hour) return hour + '小时前';
        if (min) return min + '分钟前';
        else return '刚刚';
    }

    /**
     * 格式化日期数据
     * @param date 
     * @param format 
     */
    static format(date: DateTime | Date, format?: string): string {
        format = format || 'yyyy-MM-dd';
        const d: Date = (date instanceof Date) ? date : date.instanceOfDate;
        const z = {
            y: d.getFullYear(),
            M: d.getMonth() + 1,
            d: d.getDate(),
            h: d.getHours(),
            m: d.getMinutes(),
            s: d.getSeconds(),
            f: d.getMilliseconds(),
        };
        return format.replace(/(y+|M+|d+|h+|m+|s+|f+)/g, (v) => {
            return ((v.length > 1 ? '0' : '') + eval('z. ' + v.slice(-1))).slice(
                -(v.length > 2 ? v.length : 2)
            );
        });
    }
}
