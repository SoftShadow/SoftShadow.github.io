function nextPage(){
	$('html, body').animate({
        		scrollTop: $("#taside").offset().top
        	}, 1100);
}

function toAboutMe(){
    $('html, body').animate({
                scrollTop: $(".aboutLayout").offset().top
            }, 1900);
}

$(function() {
                
        var liNodes = $('ul.timeline li'), count = liNodes.length, i, liNode;
        for(i=0; i<count; i++) {
            liNode = $(liNodes.get(i));
            if(i % 2 !== 0) {
                liNode.addClass('alt');
            }
            liNode.find('.number').text(count - i);
        }
     
    });