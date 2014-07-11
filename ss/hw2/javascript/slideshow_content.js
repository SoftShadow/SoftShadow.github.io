$(document).ready(function(window, $, undefined) {


    /*
     * smartresize: 智能化重设尺寸
     * 借鉴了github上一个人的代码来重设窗口尺寸以适合每张图片
     *
     * github网站见:
     * https://github.com/louisremi/jquery.smartresize.js
     *
     * Copyright 2011 @louis_remi
     * Licensed under the MIT license.
     */

    var $event = $.event,
        resizeTimeout;

    $event.special.smartresize = {
        setup: function() {
            $(this).bind("resize", $event.special.smartresize.handler);
        },
        teardown: function() {
            $(this).unbind("resize", $event.special.smartresize.handler);
        },
        handler: function(event, execAsap) {
            // Save the context
            var context = this,
                args = arguments;

            // set correct event type
            event.type = "smartresize";

            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function() {
                jQuery.event.handle.apply(context, args);
            }, execAsap === "execAsap" ? 0 : 100);
        }
    };

    $.fn.smartresize = function(fn) {
        return fn ? this.bind("smartresize", fn) : this.trigger("smartresize", ["execAsap"]);
    };



    /*
     * 自己编写的代码，用以实现新闻滑块的动作效果
     * 部分代码风格借鉴了站长网站模板的动画处理
     */
    $.Slideshow = function(options, element) {

        this.$el = $(element);

        /***** 图片 ****/

        // 图片元素列表
        this.$list = this.$el.find('ul.img-slider');
        // 图片元素
        this.$imgItems = this.$list.children('li');
        // 记录图片元素总数
        this.itemsCount = this.$imgItems.length;
        // 图片
        this.$images = this.$imgItems.find('img:first');

        /***** 缩略图 ****/

        // 缩略图
        this.$sliderthumbs = this.$el.find('ul.img-slider-thumbs').hide();
        // 滑动块元素
        this.$sliderElems = this.$sliderthumbs.children('li');
        // 滑动块
        this.$sliderElem = this.$sliderthumbs.children('li.img-slider-element');
        // 缩略图
        this.$thumbs = this.$sliderElems.not('.img-slider-element');

        // 初始化
        this.init(options);



    };

    $.Slideshow.defaults = {
        // 动画类型
        // "sides" : 新的滑块会从左边或者右边划入
        // "center": 新的滑块会从中间出现
        animation: 'sides', // sides || center
        // 如果autoplay的值为真，就自动连播
        autoplay: false,
        // 设置间隔
        slideshow_interval: 6000,
        // 设置滑块滑动的速度
        speed: 800,
        // 滑块擦除效果
        easing: '',
        // 设置一个标题因子
        titlesFactor: 0.60,
        // 标题动画速度
        titlespeed: 800,
        // 标题动画擦除
        titleeasing: '',
        // 缩略图最大尺寸
        thumbMaxWidth: 200
    };

    $.Slideshow.prototype = {
        init: function(options) {

            this.options = $.extend(true, {}, $.Slideshow.defaults, options);

            // 设置标题和图片透明度
            this.$imgItems.css('opacity', 0);
            this.$imgItems.find('div.img-title > *').css('opacity', 0);

            // 记录当前播放的图片
            this.current = 0;

            var self = this;

            //绑定事件
            $("#left-img-control").click(function() {
                var pos = self.current - 1;
                (self.current === 0) ? pos = self.itemsCount - 1 : pos = self.current - 1;
                self.options.autoplay = false;
                self.slideTo(pos);
            });
            $("#right-img-control").click(function() {
                var pos = self.current + 1;
                (self.current === self.itemsCount - 1) ? pos = 0 : pos = self.current + 1;
                self.options.autoplay = false;
                self.slideTo(pos);
            });
            // 预加载
            // 写一个加载状态
            this.$loading = $('<div class="img-slider-loading">Loading...</div>').prependTo(self.$el);

            $.when(this.preloadImages()).done(function() {

                // 隐藏加载状态
                self.$loading.hide();

                // 计算每个图片大小及位置
                self.setImagesSize();

                // 初始化缩略图属性
                self.initThumbs();

                // show first
                self.$imgItems.eq(self.current).css({
                    'opacity': 1,
                    'z-index': 10
                }).show().find('div.img-title > *').css('opacity', 1);

                // 如果当前自动播放
                if (self.options.autoplay) {

                    self.startSlideshow();

                }

                // 初始化事件
                self.initEvents();

            });

        },
        preloadImages: function() {

            // 预加载所有图片

            var self = this,
                loaded = 0;

            return $.Deferred(

                function(dfd) {

                    self.$images.each(function(i) {

                        $('<img/>').load(function() {

                            if (++loaded === self.itemsCount) {

                                dfd.resolve();

                            }

                        }).attr('src', $(this).attr('src'));

                    });

                }

            ).promise();

        },
        setImagesSize: function() {

            // 存下每一张幻灯片的宽度
            this.elWidth = this.$el.width();

            var self = this;

            this.$images.each(function(i) {

                var $img = $(this);
                imgDim = self.getImageDim($img.attr('src'));

                $img.css({
                    width: imgDim.width,
                    height: imgDim.height,
                    marginLeft: imgDim.left,
                    marginTop: imgDim.top
                });

            });

        },
        getImageDim: function(src) {

            var $img = new Image();

            $img.src = src;

            var c_w = this.elWidth,
                c_h = this.$el.height(),
                r_w = c_h / c_w,

                i_w = $img.width,
                i_h = $img.height,
                r_i = i_h / i_w,
                new_w, new_h, new_left, new_top;

            if (r_w > r_i) {

                new_h = c_h;
                new_w = c_h / r_i;

            } else {

                new_h = c_w * r_i;
                new_w = c_w;

            }

            return {
                width: new_w,
                height: new_h,
                left: (c_w - new_w) / 2,
                top: (c_h - new_h) / 2
            };

        },
        initThumbs: function() {

            // 将每张幻灯片的最大宽度设为option里地值
            // 每张滑块的宽度调整至合适位置
            this.$sliderElems.css({
                'max-width': this.options.thumbMaxWidth + 'px',
                'width': 100 / this.itemsCount + '%'
            });

            // 给每张滑块设置最大宽度并且显示
            this.$sliderthumbs.css('max-width', this.options.thumbMaxWidth * this.itemsCount + 'px').show();

        },
        startSlideshow: function() {

            var self = this;

            this.slideshow = setTimeout(function() {

                var pos;

                (self.current === self.itemsCount - 1) ? pos = 0 : pos = self.current + 1;

                self.slideTo(pos);

                if (self.options.autoplay) {

                    self.startSlideshow();

                }

            }, this.options.slideshow_interval);

        },
        // 显示点击的滑块
        slideTo: function(pos) {

            // 如果点了同一元素或者正加载到这张元素就不做处理
            if (pos === this.current || this.isAnimating)
                return false;

            this.isAnimating = true;

            var $currentSlide = this.$imgItems.eq(this.current),
                $nextSlide = this.$imgItems.eq(pos),
                self = this,

                preCSS = {
                    zIndex: 10
                },
                animCSS = {
                    opacity: 1
                };

            // 新幻灯片会从左边或者右边进入
            if (this.options.animation === 'sides') {

                preCSS.left = (pos > this.current) ? -1 * this.elWidth : this.elWidth;
                animCSS.left = 0;

            }

            // 标题动画
            $nextSlide.find('div.img-title > h2')
                .css('margin-right', 50 + 'px')
                .stop()
                .delay(this.options.speed * this.options.titlesFactor)
                .animate({
                    marginRight: 0 + 'px',
                    opacity: 1
                }, this.options.titlespeed, this.options.titleeasing)
                .end()
                .find('div.img-title > h3')
                .css('margin-right', -50 + 'px')
                .stop()
                .delay(this.options.speed * this.options.titlesFactor)
                .animate({
                    marginRight: 0 + 'px',
                    opacity: 1
                }, this.options.titlespeed, this.options.titleeasing)

            $.when(

                // 隐藏标题动画
                $currentSlide.css('z-index', 1).find('div.img-title > *').stop().fadeOut(this.options.speed / 2, function() {
                    // 重设样式
                    $(this).show().css('opacity', 0);
                }),

                // 下一张滑块进入动画
                $nextSlide.css(preCSS).stop().animate(animCSS, this.options.speed, this.options.easing),

                // 正在滑动的块移动到新位置
                this.$sliderElem.stop().animate({
                    left: this.$thumbs.eq(pos).position().left
                }, this.options.speed)

            ).done(function() {

                // 重置值
                $currentSlide.css('opacity', 0).find('div.img-title > *').css('opacity', 0);
                self.current = pos;
                self.isAnimating = false;

            });

        },
        initEvents: function() {

            var self = this;

            // 窗口重置
            $(window).on('smartresize.eislideshow', function(event) {

                // 图片重置尺寸
                self.setImagesSize();

                // 重置正在滑动的缩略图块
                self.$sliderElem.css('left', self.$thumbs.eq(self.current).position().left);

            });

            // 点击缩略图的事件
            this.$thumbs.on('click.eislideshow', function(event) {

                if (self.options.autoplay) {

                    clearTimeout(self.slideshow);
                    self.options.autoplay = false;

                }

                var $thumb = $(this),
                    idx = $thumb.index() - 1; // 排除正在滑动的块

                self.slideTo(idx);

                return false;

            });

        }
    };

    var logError = function(message) {

        if (this.console) {

            console.error(message);

        }

    };

    $.fn.eislideshow = function(options) {

        if (typeof options === 'string') {

            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function() {

                var instance = $.data(this, 'eislideshow');

                if (!instance) {
                    logError("Error" + options + "'");
                    return;
                }

                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("Error" + options + "'");
                    return;
                }

                instance[options].apply(instance, args);

            });

        } else {

            this.each(function() {

                var instance = $.data(this, 'eislideshow');
                if (!instance) {
                    $.data(this, 'eislideshow', new $.Slideshow(options, this));
                }

            });

        }

        return this;

    };

}(window, jQuery))