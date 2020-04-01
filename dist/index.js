"use strict";
/**
 * @file 日期类对象
 * @author zhaoyadong
 */
exports.__esModule = true;
var DateTime = /** @class */ (function () {
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
    function DateTime(year, month, day, hours, minutes, seconds, milliseconds) {
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
                // console.log(typeof(year));
                switch (typeof (year)) {
                    case 'number':
                        var _month = month == null ? 1 : month;
                        this._date = new Date(year, _month - 1, day || 1, hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
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
     * 获取毫秒秒数
     */
    DateTime.prototype.getMilliseconds = function () {
        return this._date.getMilliseconds();
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
        var currentYear = this.getYears();
        // 今天减今年的第一天（xxxx年01月01日）
        var hasTimestamp = this._date.getTime() - new Date(currentYear, 0, 1).getTime();
        // 86400000 = 24 * 60 * 60 * 1000
        var hasDays = Math.ceil(hasTimestamp / 86400000);
        return hasDays;
    };
    /**
     * 获取该实例所表示的日期所在一年中的第几周
     */
    DateTime.prototype.weekOfYear = function () {
        var firstDay = new Date(this.getYears(), 0, 1);
        var dayOfWeek = firstDay.getDay();
        var spendDay = 1;
        if (dayOfWeek != 0) {
            spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(this.getYears(), 0, 1 + spendDay);
        var d = Math.ceil((this.instanceOfDate.valueOf() - firstDay.valueOf()) / 86400000);
        var result = Math.ceil(d / 7);
        return result + 1;
    };
    /**
     * 获取当前月的天数
     */
    DateTime.prototype.daysOfMonth = function () {
        var year = this.getYears();
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
                if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
                    return 29;
                }
                else {
                    return 28;
                }
        }
        // 默认31
        return 31;
    };
    /**
     * 格式化日期
     * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数，fff-代表3位毫秒数 -是可替换字符
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
            s: this.getSeconds(),
            f: this.getMilliseconds()
        };
        return format.replace(/(y+|M+|d+|h+|m+|s+|f+)/g, function (v) {
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
        var hours = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        var milliseconds = this.getMilliseconds();
        return new DateTime(year, month, day, hours, minutes, seconds, milliseconds);
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
        var hours = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        var milliseconds = this.getMilliseconds();
        return new DateTime(year, month, day, hours, minutes, seconds, milliseconds);
    };
    /**
     * 增加天数，构造一个新的日期
     * @param num 天数量
     */
    DateTime.prototype.addDays = function (num) {
        var addMillis = num * 24 * 60 * 60 * 1000;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 增加小时，构造一个新的日期
     * @param num 小时数量
     */
    DateTime.prototype.addHours = function (num) {
        var addMillis = num * 60 * 60 * 1000;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 增加分钟，构造一个新的日期
     * @param num 分钟数量
     */
    DateTime.prototype.addMinutes = function (num) {
        var addMillis = num * 60 * 1000;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 增加秒数，构造一个新的日期
     * @param num 秒数数量
     */
    DateTime.prototype.addSeconds = function (num) {
        var addMillis = num * 1000;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 增加毫秒数，构造一个新的日期
     * @param num 毫秒数数量
     */
    DateTime.prototype.addMilliseconds = function (num) {
        var addMillis = num;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 和另外一个日期对象比较，是否相同日期
     * @param compareDate
     * @return 返回true或false
     */
    DateTime.prototype.compareTo = function (compareDate) {
        return this.toString('yyyy-MM-dd hh:mm:ss.fff') === compareDate.toString('yyyy-MM-dd hh:mm:ss.fff');
    };
    /**
     * 与一个日期对象差的天数，不足一天舍弃不计算，并且不区分正负，返回一个正整数
     * @param compareDate 比较的日期
     * @return 返回一个正整数，不关心谁大
     */
    DateTime.prototype.diffDays = function (compareDate) {
        var diff = Math.abs(this.instanceOfDate.getTime() - compareDate.instanceOfDate.getTime());
        var result = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
        return result;
    };
    /**
     * 获取时间戳，单位：毫秒
     * @return 返回一个正整数，单位：毫秒
     */
    DateTime.prototype.getTime = function () {
        return this._date.getTime();
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
        var dt = new DateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        // console.log(167, date.getFullYear(), date.getMonth() + 1, date.getDate(), dt);
        return dt;
    };
    /**
     * 获取某年某月的天数
     */
    DateTime.daysInMonth = function (year, month) {
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
                if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
                    return 29;
                }
                else {
                    return 28;
                }
        }
        // 默认31
        return 31;
    };
    return DateTime;
}());
exports["default"] = DateTime;
