/**
 * @file 类方法声明
 * @author zhaoyadong
 */

/**
 * 日期操作类
 */ 
declare class DateTime {
    /**
     * 构造函数
     */
    constructor();
    /**
     * 构造函数
     * @param value 毫米数|日期字符串 yyyy-MM-dd|日期类实例
     */
    constructor(value: number|string|Date);
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
    constructor(year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
    
    /**
     * 当前的Date类型内置对象
     */
    readonly instanceOfDate: Date;

    /**
     * 格式化日期
     * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数 -是可替换字符
     */
    toString(format?: string): string;

    /**
     * 增加年份，构建一个新的日期
     * @param num 年份数量
     */
    addYears(num: number): DateTime;

    /**
     * 增加月份，构建一个新的日期
     * @param num 月份数量
     */    
    addMonths(num: number): DateTime;

    /**
     * 增加天数，构造一个新的日期
     * @param num 天数量
     */
    addDays(num: number): DateTime;

    /**
     * 增加小时，构造一个新的日期
     * @param num 小时数量
     */
    addHours(num: number): DateTime;

    /**
     * 增加分钟，构造一个新的日期
     * @param num 分钟数量
     */
    addMinutes(num: number): DateTime;

    /**
     * 增加秒数，构造一个新的日期
     * @param num 秒数数量
     */
    addSeconds(num: number): DateTime;

    /**
     * 增加毫秒数，构造一个新的日期
     * @param num 毫秒数数量
     */
    addMilliseconds(num: number): DateTime;

    /**
     * 获取年份
     */
    getYears(): number;

    /**
     * 获取月份
     */
    getMonths(): number;

    /**
     * 获取天数
     */
    getDays(): number;

    /**
     * 获取小时
     */
    getHours(): number;

    /**
     * 获取分钟
     */
    getMinutes(): number;

    /**
     * 获取秒数
     */
    getSeconds(): number;

    /**
     * 获取毫秒秒数
     */
    getMilliseconds(): number;

    /**
     * 可返回一周（0~6）的某一天的数字。注: 星期天为 0, 星期一为 1, 以此类推。
     */
    dayOfWeek(): number;

    /**
     * 获取该实例所表示的日期是一年的第几天
     */
    dayOfYear(): number;

    /**
     * 获取该实例所表示的日期所在一年中的第几周
     */
    weekOfYear(): number;

    /**
     * 获取当前月的天数
     */
    daysOfMonth(): number;

    /**
     * 和另外一个日期对象比较，是否相同日期
     * @param compareDate 需要比对的日期
     * @return 返回true或false
     */
    compareTo(compareDate: DateTime): boolean;

    /**
     * 与一个日期对象差的天数，不足一天舍弃不计算，并且不区分正负，返回一个正整数
     * @param compareDate 比较的日期
     * @return 返回一个正整数，不关心谁大
     */
    diffDays(compareDate: DateTime): number;

    /**
     * 获取时间戳，单位：毫秒
     * @return 返回一个正整数，单位：毫秒
     */
    getTime(): number;

    /**
     * 今天
     */
    static today(): DateTime;

    /**
     * 当前时间
     */
    static now(): DateTime;

    /**
     * 获取某年某月的天数
     * @param year 年份
     * @param month 月份
     */
    static daysInMonth(year: number, month: number): number;
}

export = DateTime;