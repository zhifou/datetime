/**
 * @file 日期类对象
 * @author zhaoyadong
 */

export default class DateTime {

    /**
     * 构造函数
     * @param year
     * @param month
     * @param day
     * @param hour
     * @param minute
     * @param second
     * @param ms
     */
    public constructor(year?: number|string|Date, month?: number, day?: number, hour?: number, minute?: number, second?: number) {

        if (!year) {
            this._date = new Date();
        } else {
            if (arguments.length === 1) {
                this._date = new Date(year);
            } else {
                // console.log(typeof(year));
                switch (typeof(year)) {
                    case 'number':
                        let _month: number = month == null ? 1 : month;
                        this._date = new Date(year, _month - 1, day || 1, hour || 0, minute || 0, second || 0);
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
     * 可返回一周（0~6）的某一天的数字。注: 星期天为 0, 星期一为 1, 以此类推。
     */
    dayOfWeek(): number {
        return this._date.getDay();
    }

    /**
     * 获取该实例所表示的日期是一年的第几天
     */
    dayOfYear(): number {
        // 暂时未实现
        return 0;
    }

    /**
     * 获取该实例所表示的日期所在一年中的第几周
     */
    weekOfYear(): number {
        // 暂时未实现
        return 0;
    }

    /**
     * 获取当前月的天数
     */
    daysOfMonth(): number {
        // 暂时未实现
        return 31;
    }

    /**
     * 格式化日期
     * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数 -是可替换字符
     */
    toString(format?: string): string {
        format = format || 'yyyy-MM-dd';
        let i = 0;
        let z = {
            y: this.getYears(),
            M: this.getMonths(),
            d: this.getDays(),
            h: this.getHours(),
            m: this.getMinutes(),
            s: this.getSeconds()
        };
        return format.replace(/(y+|M+|d+|h+|m+|s+)/g, (v) => {
            return ((v.length > 1 ? "0" : "") + eval('z. ' + v.slice(-1)))
                .slice(-(v.length > 2 ? v.length : 2));
        });
    }

    /**
     * 增加年份，构建一个新的日期
     * @param num 年份数量
     */
    addYears(num: number): DateTime {
        let year: number = this.getYears() + num;
        year = year > 0 ? year : 1;
        let month: number = this.getMonths();
        let day: number = this.getDays();
        let hour: number = this.getHours();
        let minute: number = this.getMinutes();
        let second: number = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    }

    /**
     * 增加月份，构建一个新的日期
     * @param num 月份数量
     */
    addMonths(num: number): DateTime {
        let year: number = this.getYears();
        year = year > 0 ? year : 1;
        let month: number = this.getMonths() + num;
        let day: number = this.getDays();
        let hour: number = this.getHours();
        let minute: number = this.getMinutes();
        let second: number = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    }

    /**
     * 增加天数，构造一个新的日期
     * @param num 天数量
     */
    addDays(num: number): DateTime {
        let year: number = this.getYears();
        year = year > 0 ? year : 1;
        let month: number = this.getMonths();
        let day: number = this.getDays() + num;
        let hour: number = this.getHours();
        let minute: number = this.getMinutes();
        let second: number = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    }

    /**
     * 增加小时，构造一个新的日期
     * @param num 小时数量
     */
    addHours(num: number): DateTime {
        let year: number = this.getYears();
        year = year > 0 ? year : 1;
        let month: number = this.getMonths();
        let day: number = this.getDays();
        let hour: number = this.getHours() + num;
        let minute: number = this.getMinutes();
        let second: number = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    }

    /**
     * 增加分钟，构造一个新的日期
     * @param num 分钟数量
     */
    addMinutes(num: number): DateTime {
        let year: number = this.getYears();
        year = year > 0 ? year : 1;
        let month: number = this.getMonths();
        let day: number = this.getDays();
        let hour: number = this.getHours();
        let minute: number = this.getMinutes() + num;
        let second: number = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    }

    /**
     * 增加秒数，构造一个新的日期
     * @param num 秒数数量
     */
    addSeconds(num: number): DateTime {
        let year: number = this.getYears();
        year = year > 0 ? year : 1;
        let month: number = this.getMonths();
        let day: number = this.getDays();
        let hour: number = this.getHours();
        let minute: number = this.getMinutes();
        let second: number = this.getSeconds() + num;
        return new DateTime(year, month, day, hour, minute, second);
    }

    /**
     * 和另外一个日期对象比较，是否相同日期
     * @param compareDate
     */
    compareTo(compareDate: DateTime): boolean {
        // 待开发
        return true;
    }

    /**
     * 今天
     */
    static today(): DateTime {
        let date = new Date();

        let dt = new DateTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
        // console.log(167, date.getFullYear(), date.getMonth() + 1, date.getDate(), dt);
        return dt;
    }

    /**
     * 当前时间
     */
    static now(): DateTime {
        let date = new Date();

        let dt = new DateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        // console.log(167, date.getFullYear(), date.getMonth() + 1, date.getDate(), dt);
        return dt;
    }

    /**
     * 获取某年某月的天数
     */
    static daysInMonth(year: number, month: number): number {
        // 暂时未实现
        return 31;
    }
}

