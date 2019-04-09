/**
 * Created by Johnny Wang on 2017/3/26.
 */

/**
 * Visno工具方法
 */
var FrameUtils = {
    /**
     * 日期格式化工具
     * @param date
     * @param pattern
     * @returns {*}
     */
    getFormattedDate: function (date, pattern) {
        var o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(pattern)) pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(pattern)) pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        return pattern;
    },
    /**
     * 从日期字符串获取日期对象，字符串格式为2018-01-09或2018-1-9
     * @param dateStr
     * @returns {*}
     */
    getDateFromString: function (dateStr) {
        if (!dateStr || !dateStr instanceof String) {
            return null;
        }

        var array = dateStr.split('-');
        if (array.length != 3) {
            return null;
        }

        var year;
        var month;
        var day;

        try {
            year = Number(array[0]);
            month = Number(array[1]) - 1;
            day = Number(array[2]);
        } catch (e) {
            console.warn('日期格式错误。');
            return null;
        }

        return new Date(year, month, day);
    },

    /**
     * 从入参获取年份（数字类型），入参可以是数字、字符串、日期对象
     * @param yearOrDate
     * @returns {*}
     */
    getYear: function (yearOrDate) {
        var year;

        if (typeof(yearOrDate) == 'number') {
            year = yearOrDate;
        } else if (typeof(yearOrDate) == 'string') {
            try {
                year = Number(yearOrDate);
            } catch (e) {
                console.warn('传入参数不是年份。');
            }
        } else if (yearOrDate instanceof Date) {
            year = yearOrDate.getFullYear();
        } else {
            year = new Date().getFullYear();
        }

        return year;
    },

    /**
     * 调用getYear获取年份，并返回该年第一天（1月1日）的日期对象
     * @param yearOrDate
     * @returns {Date}
     */
    getFirstDayOfYear: function (yearOrDate) {
        var year = this.getYear(yearOrDate);
        return new Date(year, 0, 1);
    },

    /**
     * 调用getYear获取年份，并返回该年最后一天（12月31日）的日期对象
     * @param yearOrDate
     * @returns {Date}
     */
    getLastDayOfYear: function (yearOrDate) {
        var year = this.getYear(yearOrDate);
        return new Date(year, 11, 31);
    },

    /**
     * js获取uuid的方法，返回uuid字符串
     * @returns {string}
     */
    uuid: function () {
        /**
         * @return {string}
         */
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    /**
     * alert提示框
     * @param msg: 弹框内容
     * @param fun: 点击“确定”的回调函数，可以省略
     */
    alert: function (msg, fun) {
        layer.open({
            title: VisnoConstants.MSG.ALERT_TITLE, // 提示框标题
            content: msg, // 提示框内容
            yes: function (index) {
                if (typeof fun == 'function') {
                    fun();
                }
                layer.close(index); // 关闭当前确认框
            },

            offset: '150px', // 位置
            closeBtn: 0, // 是否展示右上角的×
            //shadeClose: true, // 点击灰色区域是否关闭
            move: false // 是否可以移动
        });
    },
    /**
     * confirm确认框
     * @param msg 提示框内容
     * @param fun1 点击“是”的回调函数，可以省略
     * @param fun2 点击“否”的回调函数，可以省略
     */
    confirm: function (msg, fun1, fun2) {
        layer.confirm(
            msg, {
                title: VisnoConstants.MSG.ALERT_TITLE,
                btn: ['是', '否'], // 两个按钮

                offset: '150px', // 位置
                closeBtn: 0, // 是否展示右上角的×
                //shadeClose: true, // 点击灰色区域是否关闭
                move: false // 是否可以移动
            }, function (index) {
                if (typeof fun1 == 'function') {
                    fun1();
                }
                layer.close(index); // 关闭当前确认框
            }, function (index) {
                if (typeof fun2 == 'function') {
                    fun2();
                }
                layer.close(index); // 关闭当前确认框
            }
        );
    },
    confirmAlert: function (msg, fun1, fun2) {
        layer.confirm(
            msg, {
                title: VisnoConstants.MSG.ALERT_TITLE,
                btn: ['确定'], // 两个按钮

                offset: '150px', // 位置
                closeBtn: 0, // 是否展示右上角的×
                //shadeClose: true, // 点击灰色区域是否关闭
                move: false // 是否可以移动
            }, function (index) {
                if (typeof fun1 == 'function') {
                    fun1();
                }
                layer.close(index); // 关闭当前确认框
            }, function (index) {
                if (typeof fun2 == 'function') {
                    fun2();
                }
                layer.close(index); // 关闭当前确认框
            }
        );
    },
    /**
     * 遮罩层的展示和隐藏
     * @param action 可选值为①show:展示遮罩层；②hide:隐藏遮罩层，需要传递第二个参数index，index是mask('show')的返回值
     * @param index 当action参数值为hide时需要传递该参数
     * @returns action为show时返回隐藏遮罩用的index；action为hide时无返回值
     */
    mask: function (action, index) {
        if (action == 'show') { // show为展示遮罩
            return layer.load(1, {
                shade: [0.3, '#fff'] // 0.3透明度的白色背景
            });
        } else if (action == 'hide' && index) { // hide为隐藏遮罩，需要传递第二个参数
            layer.close(index);
        }
    }

};

/**
 * Visno常量
 */
var VisnoConstants = {
    /**
     * 日期格式正则
     */
    DATE_PATTERN: {
        P1: 'yyyy-MM-dd',
        P2: 'yyyy-MM-dd hh:mm:ss'
    },
    /**
     * 用户状态
     */
    USER_STATUES: {
        OPEN: 'open', // 在职
        CLOSE: 'close', // 离职
        DELETE: 'delete' // 删除
    },
    /**
     * 标识
     */
    FLAG: {
        SUC: '0',
        FAIL: '1',
        TRUE: true,
        FALSE: false
    },
    MSG: {
        ALERT_TITLE: '系统提示'
    },
    /**
     * 提示语
     */
    MSG: {
        ALERT_TITLE: '系统提示',
        SUCCESS: '操作成功。',
        PLEASE_SELECT: '请选择要操作的数据。',
        ONE_ALLOWED: '一次只能操作一条数据。'
    }
};
