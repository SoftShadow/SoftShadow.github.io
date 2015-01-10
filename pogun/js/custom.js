var keyspec = function() {
    prospecRev();
    $("#key-spec").css('display', 'block').addClass('animated fadeInRight').promise().done(function() {
        $(".key-sd-bottom").fadeIn(900, function() {
            $(".key-sd-bottom").css('width', '75%').css('background', '#ffa800');
            $("#key-spec .spec-num").css('opacity', '1').addClass('fadeInDown animated');
            $(".indicator1, .indicator2, .indicator3").css('opacity', '1').addClass('fadeInRight animated');
        });
    });
    $('#pro-spec').css('display', 'none');
};

var prospec = function() {
    keyspecRev();
    $("#pro-spec").css('display', 'block').addClass('animated fadeInRight').promise().done(function() {
        $(".fr-bottom").fadeIn(900, function() {
            $(".fr-bottom").css('width', '70%');
            $(".fr-side").addClass('sp-fix');
            $(".tp-side").addClass('sp-fix');
            $("#pro-spec .spec-num").css('opacity', '1').addClass('fadeInDown animated');
            $("#pro-spec .spec-num-vr").css('opacity', '1').addClass('fadeInRight animated');
        });
    });
};

var prospecRev = function() {
    $("#pro-spec").css('display', 'none');
    $(".fr-bottom").fadeOut();
    $(".fr-bottom").css('width', '0%');
    $(".fr-side").removeClass('sp-fix');
    $(".tp-side").removeClass('sp-fix');
    $("#pro-spec .spec-num").css('opacity', '0').removeClass('fadeInDown animated');
};
var keyspecRev = function() {
    $("#key-spec").css('display', 'none');
    $(".key-sd-bottom").fadeOut();
    $(".key-sd-bottom").css('width', '0%').css('background', '333');
    $(".fr-side").css('height', '0px');
    $(".tp-side").css('height', '0px');
    $("#key-spec .spec-num").css('opacity', '0').removeClass('fadeInDown animated');
};

var toggleDet = function() {
    $("#amp-det").toggleClass("det-active animated fadeInRight");
    $("#key-det").toggleClass("det-active animated fadeInRight");
};

$("#stage-1").waypoint(function() {
    $("a").removeClass('active-lit').promise().done(function() {
        $("#1").addClass('active-lit');
    });
}, {
    offset: -10
});




$('#stage-2')
    .waypoint(function(direction) {
        if (direction === 'down') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#2").addClass('active-lit');

            });
            $(" #quo-2").addClass('animated fadeInUp');

        }
    }, {
        offset: 275
    })
    .waypoint(function(direction) {
        if (direction === 'up') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#2").addClass('active-lit');
            });
        }
    }, {
        offset: -10
    });


$('#stage-3')
    .waypoint(function(direction) {
        if (direction === 'down') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#3").addClass('active-lit');
            });
        }
    }, {
        offset: 100
    })
    .waypoint(function(direction) {
        if (direction === 'up') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#3").addClass('active-lit');
            });
        }
    }, {
        offset: -10
    });



$('#pro-spec').waypoint(function(direction) {
    prospec();
}, {
    offset: 375,
    triggerOnce: true
});


$('#stage-4')
    .waypoint(function(direction) {
        if (direction === 'down') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#4").addClass('active-lit');
            });
        }
    }, {
        offset: 50
    })
    .waypoint(function(direction) {
        if (direction === 'up') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#4").addClass('active-lit');
            });
        }
    }, {
        offset: -10
    });

$('#stage-5')
    .waypoint(function(direction) {
        if (direction === 'down') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#5").addClass('active-lit');
            });
            $(" #spec-round").addClass('animated fadeInDown rotateIn');
        }
    }, {
        offset: 300
    })
    .waypoint(function(direction) {
        if (direction === 'up') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#5").addClass('active-lit');
            });
        }
    }, {
        offset: -10
    });

$('#stage-6')
    .waypoint(function(direction) {
        if (direction === 'down') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#6").addClass('active-lit');
            });
        }
    }, {
        offset: 10
    })
    .waypoint(function(direction) {
        if (direction === 'up') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#6").addClass('active-lit');
            });
        }
    }, {
        offset: -10
    });

$('#stage-7')
    .waypoint(function(direction) {
        if (direction === 'down') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#7").addClass('active-lit');
            });
        }
    }, {
        offset: 10
    })
    .waypoint(function(direction) {
        if (direction === 'up') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#7").addClass('active-lit');
            });
        }
    }, {
        offset: -10
    });

$('#stage-8')
    .waypoint(function(direction) {
        if (direction === 'down') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#8").addClass('active-lit');
            });
        }
    }, {
        offset: 10
    })
    .waypoint(function(direction) {
        if (direction === 'up') {
            $("a").removeClass('active-lit').promise().done(function() {
                $("#8").addClass('active-lit');
            });
        }
    }, {
        offset: -10
    });


$("#spec-animation").waypoint(function() {
    $('#diagram').css('height', '775px').css('opacity', '1');
}, {
    offset: 0
});



$("#wh").waypoint(function(direction) {
        if (direction === 'down') {
            $("body").addClass('bg-change');
            $("a").removeClass('active-lit');
            $("#cta-group").delay(900).addClass('animated fadeIn');
            $("#cta-po").delay(900).addClass('animated fadeIn');
        }
    })
    .waypoint(function(direction) {
        if (direction === 'up') {
            $("body").removeClass('bg-change');
        }
    }, {
        offset: 300
    });

//$( "#cta-way" ).waypoint(function() {
//  $("a").removeClass('active-lit');
//  $("#cta-group").delay(900).addClass('animated fadeIn');
//}, { offset: 100 });




$(".toggle").click(function() {
    $(this).toggleClass("orange");
    if ($('#tg').hasClass("orange")) {
        keyspec();
    } else {
        prospec();
    }
    toggleDet();
});




$(".key-toggle").click(function() {
    var outputSwitch = function() {
        $("#output-container").fadeIn().addClass('animated fadeInRight');
        $('#tube-container').css('display', 'none');
    };

    var tubeSwitch = function() {
        $("#tube-container").fadeIn().addClass('animated fadeInLeft');
        $('#output-container').css('display', 'none');
    };

    $(this).toggleClass("key-orange").promise().done(function() {
        $("#tube-switch").toggleClass("switch-active");
        $("#output-switch").toggleClass("switch-active").promise().done(function() {
            if ($('#output-switch').hasClass("switch-active")) {
                outputSwitch();
            } else {
                tubeSwitch();
            }
        });
    });
});


$('.mob-drop').click(function() {
    $('#hd-mob').toggleClass("active");
    $('header').toggleClass("active");
});

$('.mob-slide').click(function() {
    $('#hd-mob').toggleClass("active");
    $('header').toggleClass("active");
});


/* $( "#stage-2" ).waypoint(function() {
  $("a").removeClass('active-lit').promise().done(function(){
      $("#2").addClass('active-lit');
  });
  $(" #quo-2").addClass('animated fadeInUp');
}, { offset: 0});
*/
