(function() {
    $.getJSON("json/index.json", function(data) {
        var img = $("img.responsiveslide");
        var thumbs = $("img.slide-show-thumb");
        var title = $("div.img-title");
        /***** 读入图片信息 *****/
        for (var i = 0; i < data.count; i++) {
            $(img[i]).attr("src", data.content[i].src);
            $(thumbs[i]).attr("src", data.content[i].src);
            $(title[i]).append("“ " + data.content[i].title + " ”");
        }



        /***** 添加动画效果 *****/
        $('#img').eislideshow({
            animation: 'center',
            autoplay: true,
            slideshow_interval: 6000,
            titlesFactor: 0
        });
    })
})()