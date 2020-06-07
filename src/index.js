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
                switch (typeof year) {
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
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
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
            return ((v.length > 1 ? '0' : '') + eval('z. ' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2));
        });
    };
    /**
     * 判断是否为闰年
     * @param year 年份
     */
    DateTime.prototype.isLeapYear = function () {
        return DateTime.isLeapYear(this.getYears());
    };
    /**
     * 增加年份，构建一个新的日期
     * @param num 年份数量
     */
    DateTime.prototype.addYears = function (num) {
        var year = this.getYears();
        year = year > 0 ? year : 1;
        year += num;
        var month = this.getMonths();
        var day = this.getDays();
        if (month === 2 && day === 29) {
            if (!DateTime.isLeapYear(year)) {
                // 如果是平年，则取28日，为最后一天
                day = 28;
            }
        }
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
        var newDate = new Date(year, month - 1, 1);
        var newMonth = newDate.getMonth() + 1;
        var newYear = newDate.getFullYear();
        var day = this.getDays();
        if (day === 31 || day === 30 || day === 29) {
            var day31 = [1, 3, 5, 7, 8, 10, 12];
            var day30 = [4, 6, 9, 11];
            var day29 = [2];
            if (day === 31) {
                if (day29.includes(newMonth)) {
                    if (DateTime.isLeapYear(newYear)) {
                        day = 29;
                    }
                    else {
                        day = 28;
                    }
                }
                else if (day30.includes(newMonth)) {
                    day = 30;
                }
            }
            else if (day === 30) {
                if (day29.includes(newMonth)) {
                    if (DateTime.isLeapYear(newYear)) {
                        day = 29;
                    }
                    else {
                        day = 28;
                    }
                }
            }
            else {
                if (!DateTime.isLeapYear(newYear)) {
                    day = 28;
                }
            }
        }
        var hours = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        var milliseconds = this.getMilliseconds();
        return new DateTime(newYear, newMonth, day, hours, minutes, seconds, milliseconds);
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
        return (this.toString('yyyy-MM-dd hh:mm:ss.fff') ===
            compareDate.toString('yyyy-MM-dd hh:mm:ss.fff'));
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
     * 格式化显示距离当前日期已经过去多少时间
     * @return 返回一个字符串
     */
    DateTime.prototype.formatPassTime = function () {
        return DateTime.formatPassTime(this._date);
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
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
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
     * 判断是否为闰年
     * @param year 年份
     */
    DateTime.isLeapYear = function (year) {
        if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
            // console.log('闰年');
            return true;
        }
        else {
            // console.log('平年');
            return false;
        }
    };
    /**
     * 格式化现在的已过时间
     * @param  startTime {Date} 开始时间
     * @return {String}
     */
    DateTime.formatPassTime = function (startTime) {
        var sTime = null;
        if (startTime instanceof DateTime) {
            sTime = startTime.instanceOfDate;
        }
        else if (startTime instanceof Date) {
            sTime = startTime;
        }
        else {
            return '';
        }
        var st = sTime.getTime();
        var currentTime = new Date().getTime(), time = currentTime - st, day = Math.round(time / (1000 * 60 * 60 * 24)), hour = Math.round(time / (1000 * 60 * 60)), min = Math.round(time / (1000 * 60)), month = Math.round(day / 30), year = Math.round(month / 12);
        if (year)
            return year + '年前';
        if (month)
            return month + '个月前';
        if (day)
            return day + '天前';
        if (hour)
            return hour + '小时前';
        if (min)
            return min + '分钟前';
        else
            return '刚刚';
    };
    /**
     * 格式化日期数据
     * @param date
     * @param format
     */
    DateTime.format = function (date, format) {
        format = format || 'yyyy-MM-dd';
        var d = (date instanceof Date) ? date : date.instanceOfDate;
        var z = {
            y: d.getFullYear(),
            M: d.getMonth() + 1,
            d: d.getDate(),
            h: d.getHours(),
            m: d.getMinutes(),
            s: d.getSeconds(),
            f: d.getMilliseconds()
        };
        return format.replace(/(y+|M+|d+|h+|m+|s+|f+)/g, function (v) {
            return ((v.length > 1 ? '0' : '') + eval('z. ' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2));
        });
    };
    return DateTime;
}());
exports["default"] = DateTime;
