(function() {
    var val = 6;
    var p = $(".panigator")[0];

    var cache = [];
    cache[0] = []; //读取用户名缓存
    cache[1] = []; //读取评论内容缓存

    $.getJSON("json/whore.json", function(data) {
        var img = $("img.responsiveslide");
        var thumbs = $("img.slide-show-thumb");
        var discription = $("div.img-discription");
        var title = $("#title");

        title.append("“ " + data.title + " ”");
        /***** 读入图片信息 *****/
        for (var i = 0; i < data.number; i++) {

            $(img[i]).attr("src", data.content[i].img);
            $(thumbs[i]).attr("src", data.content[i].img);
            var t = $('<p style="margin-top:10px; margin-left:20px; margin-right:20px"/>')
            t.append(data.content[i].discription);
            $(discription[i]).append(t);
        }
        /***** 读入评论信息 *****/
        var i = 0;
        var j = 0;
        var k = 0;
        $(".panigator")[0].count = data.comment.count
        while (true) {
            cache[0][i] = [];
            cache[1][i] = [];
            for (k = 0; k < val; k++) {
                cache[0][i][k] = data.comment.user;
                if (i % 2 == 0) {
                    cache[1][i][k] = data.comment.content.ori;
                } else {
                    cache[1][i][k] = data.comment.content.alt;
                }
                j++;
                if (j == data.comment.count) break;
            }
            if (k != val) {
                $(".panigator")[0].page = i + 1;
                break;
            }
            if (i == 0) {
                for (k = 0; k < val; k++) {
                    var l = $('<li/>')
                    var t = $('<div class="time"/>');
                    $(t).append("2014-7-11");
                    var h = $('<div class="hour"/>');
                    $(h).append("2:32");
                    var n = $('<div class="number"/>');
                    $(n).append(k + 1 + "");
                    var cc = $('<div class="commentcontent"/>');
                    var h2 = $('<h2 class="user"/>');
                    $(h2).append(data.comment.user);
                    var p = $('<p class="user-comment"/>');
                    $(p).append(data.comment.content.ori);
                    $(cc).append(h2);
                    $(cc).append(p);
                    var li = $('<div class="line"/>');
                    $(l).append(t);
                    $(l).append(h);
                    $(l).append(n);
                    $(l).append(cc);
                    $(l).append(li);
                    $("ul.commentline").append(l[0]);

                }
            }
            i++;
        }
        /****** 初始化参数 *****/
        $("#count")[0].innerHTML = $(".panigator")[0].count + "";
        $("#page")[0].innerHTML = $(".panigator")[0].page + "";
        $("#currPage")[0].innerHTML = "1";
        $("#firPage").attr("disabled", "disabled");
        $("#prePage").attr("disabled", "disabled");
        $(".panigator")[0].currPage = 1;

        /***** 添加动画效果 *****/
        $('#img').eislideshow({
            animation: 'center',
            autoplay: true,
            slideshow_interval: 6000,
            titlesFactor: 0
        });
    })




    /****** 按钮操作 *****/
    $("#prePage").click(function(e) {
        p.currPage--;
        if (p.currPage == 1) {
            $("#firPage").attr("disabled", "disabled");
            $("#prePage").attr("disabled", "disabled");
        } else if (p.currPage == p.page) {
            $("#lasPage").attr("disabled", "disabled");
            $("#nexPage").attr("disabled", "disabled");
        } else {
            $("#firPage").attr("disabled", false);
            $("#prePage").attr("disabled", false);
            $("#lasPage").attr("disabled", false);
            $("#nexPage").attr("disabled", false);
        }
        var u = $(".user");
        var uc = $(".user-comment");
        for (var i = 0; i < cache[0][p.currPage - 1].length; i++) {
            u[i].innerHTML = cache[0][p.currPage - 1][i];
            uc[i].innerHTML = cache[1][p.currPage - 1][i];
        }
        $("#currPage")[0].innerHTML = p.currPage + "";
    })
    $("#nexPage").click(function(e) {
        p.currPage++;
        if (p.currPage == 1) {
            $("#firPage").attr("disabled", "disabled");
            $("#prePage").attr("disabled", "disabled");
        } else if (p.currPage == p.page) {
            $("#lasPage").attr("disabled", "disabled");
            $("#nexPage").attr("disabled", "disabled");
        } else {
            $("#firPage").attr("disabled", false);
            $("#prePage").attr("disabled", false);
            $("#lasPage").attr("disabled", false);
            $("#nexPage").attr("disabled", false);
        }
        var u = $(".user");
        var uc = $(".user-comment");
        for (var i = 0; i < cache[0][p.currPage - 1].length; i++) {
            u[i].innerHTML = cache[0][p.currPage - 1][i];
            uc[i].innerHTML = cache[1][p.currPage - 1][i];
        }
        $("#currPage")[0].innerHTML = p.currPage + "";
    })
    $("#firPage").click(function(e) {
        p.currPage = 1;
        $("#firPage").attr("disabled", "disabled");
        $("#prePage").attr("disabled", "disabled");
        $("#lasPage").attr("disabled", false);
        $("#nexPage").attr("disabled", false);
        var u = $(".user");
        var uc = $(".user-comment");
        for (var i = 0; i < cache[0][p.currPage - 1].length; i++) {
            u[i].innerHTML = cache[0][p.currPage - 1][i];
            uc[i].innerHTML = cache[1][p.currPage - 1][i];
        }
        $("#currPage")[0].innerHTML = p.currPage + "";
    })
    $("#lasPage").click(function(e) {
        p.currPage = p.page;
        $("#firPage").attr("disabled", false);
        $("#prePage").attr("disabled", false);
        $("#lasPage").attr("disabled", "disabled");
        $("#nexPage").attr("disabled", "disabled");
        var u = $(".user");
        var uc = $(".user-comment");
        for (var i = 0; i < cache[0][p.currPage - 1].length; i++) {
            u[i].innerHTML = cache[0][p.currPage - 1][i];
            uc[i].innerHTML = cache[1][p.currPage - 1][i];
        }
        $("#currPage")[0].innerHTML = p.currPage + "";
    })
})()