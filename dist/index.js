"use strict";
/**
 * @file 日期类对象
 * @author zhaoyadong
 */
exports.__esModule = true;
var DateTime = /** @class */ (function () {
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
    function DateTime(year, month, day, hour, minute, second) {
        this._date = null;
        /**
         * 当前的Date类型内置对象
         */
        this.instanceOfDate = null;
        if (!year) {
            this._date = new Date();
        }
        else {
            if (arguments.length === 1) {
                this._date = new Date(year);
            }
            else {
                console.log(typeof (year));
                switch (typeof (year)) {
                    case 'number':
                        var _month = month == null ? 1 : month;
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
    /**
     * 获取年份
     */
    DateTime.prototype.getYears = function () {
        return this._date.getFullYear();
    };
    /**
     * 获取月份
     */
    DateTime.prototype.getMonths = function () {
        return this._date.getMonth() + 1;
    };
    /**
     * 获取天数
     */
    DateTime.prototype.getDays = function () {
        return this._date.getDate();
    };
    /**
     * 获取小时
     */
    DateTime.prototype.getHours = function () {
        return this._date.getHours();
    };
    /**
     * 获取分钟
     */
    DateTime.prototype.getMinutes = function () {
        return this._date.getMinutes();
    };
    /**
     * 获取秒数
     */
    DateTime.prototype.getSeconds = function () {
        return this._date.getSeconds();
    };
    /**
     * 可返回一周（0~6）的某一天的数字。注: 星期天为 0, 星期一为 1, 以此类推。
     */
    DateTime.prototype.dayOfWeek = function () {
        return this._date.getDay();
    };
    /**
     * 获取该实例所表示的日期是一年的第几天
     */
    DateTime.prototype.dayOfYear = function () {
        // 暂时未实现
        return 0;
    };
    /**
     * 获取该实例所表示的日期所在一年中的第几周
     */
    DateTime.prototype.weekOfYear = function () {
        // 暂时未实现
        return 0;
    };
    /**
     * 获取当前月的天数
     */
    DateTime.prototype.daysOfMonth = function () {
        // 暂时未实现
        return 31;
    };
    /**
     * 格式化日期
     * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数 -是可替换字符
     */
    DateTime.prototype.toString = function (format) {
        format = format || 'yyyy-MM-dd';
        var i = 0;
        var z = {
            y: this.getYears(),
            M: this.getMonths(),
            d: this.getDays(),
            h: this.getHours(),
            m: this.getMinutes(),
            s: this.getSeconds()
        };
        return format.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
            return ((v.length > 1 ? "0" : "") + eval('z. ' + v.slice(-1)))
                .slice(-(v.length > 2 ? v.length : 2));
        });
    };
    /**
     * 增加年份，构建一个新的日期
     * @param num 年份数量
     */
    DateTime.prototype.addYears = function (num) {
        var year = this.getYears() + num;
        year = year > 0 ? year : 1;
        var month = this.getMonths();
        var day = this.getDays();
        var hour = this.getHours();
        var minute = this.getMinutes();
        var second = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    };
    /**
     * 增加月份，构建一个新的日期
     * @param num 月份数量
     */
    DateTime.prototype.addMonths = function (num) {
        var year = this.getYears();
        year = year > 0 ? year : 1;
        var month = this.getMonths() + num;
        var day = this.getDays();
        var hour = this.getHours();
        var minute = this.getMinutes();
        var second = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    };
    /**
     * 增加天数，构造一个新的日期
     * @param num 天数量
     */
    DateTime.prototype.addDays = function (num) {
        var year = this.getYears();
        year = year > 0 ? year : 1;
        var month = this.getMonths();
        var day = this.getDays() + num;
        var hour = this.getHours();
        var minute = this.getMinutes();
        var second = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    };
    /**
     * 增加小时，构造一个新的日期
     * @param num 小时数量
     */
    DateTime.prototype.addHours = function (num) {
        var year = this.getYears();
        year = year > 0 ? year : 1;
        var month = this.getMonths();
        var day = this.getDays();
        var hour = this.getHours() + num;
        var minute = this.getMinutes();
        var second = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    };
    /**
     * 增加分钟，构造一个新的日期
     * @param num 分钟数量
     */
    DateTime.prototype.addMinutes = function (num) {
        var year = this.getYears();
        year = year > 0 ? year : 1;
        var month = this.getMonths();
        var day = this.getDays();
        var hour = this.getHours();
        var minute = this.getMinutes() + num;
        var second = this.getSeconds();
        return new DateTime(year, month, day, hour, minute, second);
    };
    /**
     * 增加秒数，构造一个新的日期
     * @param num 秒数数量
     */
    DateTime.prototype.addSeconds = function (num) {
        var year = this.getYears();
        year = year > 0 ? year : 1;
        var month = this.getMonths();
        var day = this.getDays();
        var hour = this.getHours();
        var minute = this.getMinutes();
        var second = this.getSeconds() + num;
        return new DateTime(year, month, day, hour, minute, second);
    };
    /**
     * 和另外一个日期对象比较，是否相同日期
     * @param compareDate
     */
    DateTime.prototype.compareTo = function (compareDate) {
        // 待开发
        return true;
    };
    /**
     * 今天
     */
    DateTime.today = function () {
        var date = new Date();
        var dt = new DateTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
        // console.log(167, date.getFullYear(), date.getMonth() + 1, date.getDate(), dt);
        return dt;
    };
    /**
     * 当前时间
     */
    DateTime.now = function () {
        var date = new Date();
        var dt = new DateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        // console.log(167, date.getFullYear(), date.getMonth() + 1, date.getDate(), dt);
        return dt;
    };
    /**
     * 获取某年某月的天数
     */
    DateTime.daysInMonth = function (year, month) {
        // 暂时未实现
        return 31;
    };
    return DateTime;
}());
exports["default"] = DateTime;
