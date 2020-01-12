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
     */
    constructor(value: number|string|Date);
    /**
     * 构造函数
     */
    constructor(year: number, month: number, day?: number, hour?: number, minute?: number, second?: number);
    
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
     */
    compareTo(compareDate: DateTime): boolean;

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