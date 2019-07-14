; (function () {
    //先在jq对象里面返回一个Init对象
    function jQuery(selector) {
        return new Init(selector);
    }
    //需要把所有的方法放在原型对象上
    function Init(selector) {
        var dom = document.querySelectorAll(selector);
        //遍历伪数组
        for (var i = 0; i < dom.length; i++) {
            this[i] = dom[i];
        }
        //获取length
        this.length = dom.length;
    }

    //因为在jq里面有很多需要遍历的地方，所以需要先封装一个遍历伪数组的方法
    Init.prototype.each = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback(i, this[i]);
        }
    }

    /**
     * 
     * jq设置css样式：jq对象.css(属性名，属性值)
     * jq获取css样式：jq对象.css(属性名)
     * 
     */
    Init.prototype.css = function (prototype, value) {
        //判断是设置css样式还是获取css样式
        if (value === undefined) {
            return window.getComputedStyle(this[0])[prototype];
        } else {
            for (var i = 0; i < this.length; i++) {
                var pxArr = ['height', 'width', 'top', 'left', 'right', 'bottom'];
                //循环遍历，把需要带单位的元素和不需要带单位的元素区分
                for (var i = 0; i < this.length; i++) {
                    //判断是否需要带单位
                    if (pxArr.indexOf(prototype) !== -1) {
                        //判断是否带了单位
                        if (value.toString().indexOf('px') === -1) {
                            //需要带单位
                            this[i].style[prototype] = value + 'px';
                        } else {
                            this[i].style[prototype] = value;
                        }
                    } else {
                        this[i].style[prototype] = value;
                    }
                }
            }
            return this;
        }
    }


    //把封装的jQuery函数变成window的一个属性，让外面可以使用
    window.$ = window.jQuery = jQuery;
})()