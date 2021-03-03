/**
 * @file 日期类对象
 * @author zhaoyadong
 */
import {ITextOption} from './types';

/**
 * 一分钟的毫秒值 60000 = 60 * 1000
 */
const MILLISECONDS_MIN: number = 60000;
/**
 * 一小时的毫秒值 3600000 = 60 * 60 * 1000
 */
const MILLISECONDS_HOUR: number = MILLISECONDS_MIN * 60;
/**
 * 一天的毫秒值 86400000 = 24 * 60 * 60 * 1000
 */
const MILLISECONDS_DAY: number = MILLISECONDS_HOUR * 24;

export default class DateTime {

    /**
     * 内部私有的date对象
     */
    private _date: Date = null;

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
    constructor(
        year?: number | string | Date,
        month?: number,
        day?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number
    ) {
        if (arguments.length === 0) {
            this._date = new Date();
        } else if (arguments.length === 1) {
            // 保持new Date()参数的默认特征
            this._date = new Date(year);
        } else {
            if (typeof year !== 'number') {
                throw new Error('only support number type');
            }
            this._date = new Date(
                year,
                (month || 1) - 1,
                day || 1,
                hours || 0,
                minutes || 0,
                seconds || 0,
                milliseconds || 0
            );
        }
        this.instanceOfDate = this._date;
    }

    /**
     * 当前的Date类型内置对象
     */
    readonly instanceOfDate: Date = null;

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
            new Date(currentYear, this.getMonths() - 1, this.getDays()).getTime()
                - new Date(currentYear, 0, 1).getTime();

        const hasDays = Math.ceil(hasTimestamp / MILLISECONDS_DAY);
        return hasDays + 1;
    }

    /**
     * 获取该实例所表示的日期所在一年中的第几周
     */
    weekOfYear(): number {
        const currentYear: number = this.getYears();
        let firstDay = new Date(currentYear, 0, 1);
        let dayOfWeek = firstDay.getDay();
        let spendDay = 1;
        if (dayOfWeek !== 0) {
            spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(currentYear, 0, 1 + spendDay);
        let d = Math.ceil(
            (this._date.getTime() - firstDay.getTime()) / MILLISECONDS_DAY
        );
        let result = Math.ceil(d / 7);
        return result + 1;
    }

    /**
     * 获取当前月的天数
     */
    daysOfMonth(): number {
        return DateTime.daysOfMonth(this.getYears(), this.getMonths());
    }

    /**
     * 格式化日期
     * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数，SSS-代表3位毫秒数 -是可替换字符
     */
    toString(format?: string): string {
        format = format || 'yyyy-MM-dd hh:mm:ss';
        return DateTime.format(this, format);
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
        year += num;
        let month: number = this.getMonths();
        let day: number = this.getDays();

        if (month === 2 && day === 29 && !DateTime.isLeapYear(year)) {
            // 如果是平年，则取28日，为最后一天
            day = 28;
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
        let newDay: number = DateTime.daysOfMonth(newYear, newMonth);
        if (newDay < day) {
            day = newDay;
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
        let addMillis: number = num * MILLISECONDS_DAY;
        let time: number = this.getTime();
        return new DateTime(time + addMillis);
    }

    /**
     * 增加小时，构造一个新的日期
     * @param num 小时数量
     */
    addHours(num: number): DateTime {
        let addMillis: number = num * MILLISECONDS_HOUR;
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
     * 和另外一个日期比较，是否相同日期
     * @param equalDate
     * @return 返回true或false
     */
    equalTo(equalDate: DateTime): boolean {
        return (
            this._date.getTime() ===
            equalDate._date.getTime()
        );
    }

    /**
     * 与一个日期对象差的天数，不足一天舍弃不计算，并且不区分正负，返回一个正整数
     * @param compareDate 比较的日期
     * @return 返回一个正整数，不关心谁大
     */
    diffDays(compareDate: DateTime): number {
        let diff: number = Math.abs(
            this._date.getTime() - compareDate._date.getTime()
        );
        let result = Math.floor(Math.abs(diff) / MILLISECONDS_DAY);
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
        return dt;
    }

    /**
     * 当前时间
     */
    static now(): DateTime {
        return new DateTime();
    }

    /**
     * 判断是否为闰年
     * @param year 年份
     */
    static isLeapYear(year: number): boolean {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取某年某月的天数
     * @param year 年份
     * @param month 月份
     * @return 这个月份的天数
     */
    static daysOfMonth(year: number, month: number): number {
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
                if (DateTime.isLeapYear(year)) {
                    return 29;
                } else {
                    return 28;
                }
        }
        // 默认31
        return 31;
    }

    /**
     * 格式化现在的已过时间
     * @param startTime {Date} 开始时间
     * @param options 配置选项，可空
     *  例如：{yearText: '年前', monthText: '个月前', dayText: '天前',
     *        hourText: '小时前', minText: '分钟前', secondText: '刚刚'}
     * @return 格式化好的已过时间文本
     */
    static formatPassTime(startTime: DateTime | Date, options?: ITextOption): string {
        
        let sTime: Date = null;
        if (startTime instanceof DateTime) {
            sTime = startTime.instanceOfDate;
        } else if (startTime instanceof Date){
            sTime = startTime;
        } else {
            return '';
        }
        options = Object.assign({
            yearText: '年前',
            monthText: '个月前',
            dayText: '天前',
            hourText: '小时前',
            minText: '分钟前',
            secondText: '刚刚'
        }, options);

        let st: number = sTime.getTime();
        let currentTime: number = new Date().getTime(),
            time: number = currentTime - st,
            min: number = Math.floor(time / MILLISECONDS_MIN),
            hour: number = Math.floor(time / MILLISECONDS_HOUR),
            day: number = Math.floor(time / MILLISECONDS_DAY),
            month: number = Math.floor(time / (30 * MILLISECONDS_DAY)),
            year: number = Math.floor(time / (12 * 30 * MILLISECONDS_DAY));

        if (year) return `${year}${options.yearText}`;
        if (month) return `${month}${options.monthText}`;
        if (day) return `${day}${options.dayText}`;
        if (hour) return `${hour}${options.hourText}`;
        if (min) return `${min}${options.minText}`;
        return options.secondText;
    }

    /**
     * 格式化日期数据
     * @param date 
     * @param format 
     */
    static format(date: DateTime | Date, format?: string): string {
        format = format || 'yyyy-MM-dd hh:mm:ss';
        const d: Date = (date instanceof Date) ? date : date.instanceOfDate;
        const o: any = {
            'M+' : d.getMonth() + 1,                    // month
            'd+' : d.getDate(),                         // day
            'h+' : d.getHours(),                        // hour
            'm+' : d.getMinutes(),                      // minute
            's+' : d.getSeconds(),                      // second
            'q+' : Math.floor((d.getMonth() + 3) / 3),  // quarter
            'S+' : d.getMilliseconds()                  // millisecond
        }
    
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1,
                    (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
    
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                let formatStr = '';
                for (let i = 1; i <= RegExp.$1.length; i++) {
                    formatStr += '0';
                }
        
                let replaceStr='';
                if(RegExp.$1.length === 1){
                    replaceStr = o[k];
                } else {
                    formatStr = formatStr + o[k];
                    const index = ('' + o[k]).length;
                    formatStr = formatStr.substr(index);
                    replaceStr = formatStr;
                }
                format = format.replace(RegExp.$1, replaceStr);
            }
        }
        return format;
    }
}
