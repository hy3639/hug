$(document).ready(function(){
	$(document).on("pagecreate",".gnb-layer",function(){
		$(".gnb-layer").on("swipeleft",function(){
			$(this).animate({left:-300});
			$('.bg-modal').hide();
			$('#wrapper').attr('style', '');
		});
	});

	$('.nav .depth .title').on('click', function(){
		if ($(this).parent('li').hasClass('on'))
		{
			$('.nav .depth').removeClass('on').find('.two-depth').slideUp();
		}else{
			$('.nav .depth').removeClass('on').find('.two-depth').slideUp();
			$(this).parent('li').addClass('on').find('.two-depth').slideToggle();
		}
	});

    $('.search-btn .detail-btn .type06').on('click', function() {
        var $detail_cont = $('.detail-table-area');

        $('detail-table-area').removeClass('on');

        if ($detail_cont.is(':hidden')) {
            $detail_cont.stop().slideDown();
        } else {
            $detail_cont.stop().slideUp();
        }
    });

	/* location */
	$('.location .depth .sel').click(function(){
		if ($(this).parents('.depth').hasClass('on'))
		{
			$(this).parents('.depth').removeClass('on').find('.sub-depth').hide();
		}else{
			$(this).parents('.depth').siblings('li').removeClass('on').find('.sub-depth').hide();
			$(this).parents('.depth').addClass('on').find('.sub-depth').show();
		}
	});

	$('.location .sub-depth .close').click(function(){
		$(this).parents('.depth').removeClass('on').find('.sub-depth').hide();
	});
});

$(window).load(function(){
	var winH = $(window).height();
	$('.gnb-layer, .bg-modal').outerHeight(winH);

	/* gnb 레이어 열기*/
	$('.btn-gnb').click(function(){
		$('#wrapper').outerHeight(winH);
		$('.bg-modal').show();
		$('.gnb-layer').animate({left:0});
	});

	/* gnb 레이어 닫기*/
	$('.bg-modal').click(function(){
		$('.gnb-layer').animate({left:-300},function(){
			$('.bg-modal').hide();
			$('#wrapper').attr('style', '');
		});
	});
	/* quick 메뉴 열고 닫기*/
	$('.quick-area .quick-btn').on('click', function(){
		$('.quick-area').addClass('open');
		$('#wrapper').outerHeight(winH);
	});
	
	$('.quick-close').on('click', function(){
		$('.quick-area').removeClass('open');
		$('#wrapper').attr('style', '');
	});
});

// 탭 관련 
// obj_tab_wrap > (obj_tab_container > children > .cus-tab) > (obj_tab_view_container > children) 이런 구조를 default 로
function fnTab(obj_tab_wrap, obj_tab_container, obj_tab_view_container) {
    
    var $tab_wrap       = $(obj_tab_wrap);
    var $tab_container  = $(obj_tab_container).length > 0 ? $(obj_tab_container) : $tab_wrap.find(".tab-container");
    var $view_container = $(obj_tab_view_container).length > 0 ? $(obj_tab_view_container) : $tab_wrap.find(".tab-view-container");
    var idx_tab;
    
    $tab_container.find(".cus-tab").on("click.cus-tab", function(e) {
        
        if( $(this)[0].tagName.toLowerCase() == 'a' ) {
            e.preventDefault();
        }
        
        idx_tab = $tab_container.find(".cus-tab").index( $(this) );
        $tab_container.children().eq(idx_tab).addClass("on").siblings().removeClass("on");
        $view_container.children().eq(idx_tab).addClass("active").siblings().removeClass("active");
    });
}

// tab type2 
// 탭이 형제 사이고 view 부분을 selector 로 받는다
// 탭의 class name 의 default 는 .cus-tab
function fnTab2(arg_obj_tab_container, arg_selector_view, arg_tab_class_name) {
	
	var $tab_container  = $(arg_obj_tab_container);
	var $tab_view		= $(arg_selector_view);
	var $tab			= $(arg_tab_class_name || ".cus-tab", $tab_container);
	var idx_tab;
	
	$tab.on("click", function(e) {
		
		if( $(this)[0].tagName.toLowerCase() == 'a' ) {
            e.preventDefault();
        }
		
		idx_tab = $tab.index( $(this) );
		$tab.eq(idx_tab).addClass("on").siblings().removeClass("on");
		$tab_view.eq(idx_tab).addClass("active").siblings().removeClass("active");
		
	});
	
}

function fnTab3(arg_obj_tab_container, arg_selector_view, arg_tab_class_name) {
    
    var $tab_container  = $(arg_obj_tab_container);
    var $tab_view       = $(arg_selector_view);
    var $tab            = $(arg_tab_class_name || ".cus-tab", $tab_container);
    var idx_tab;
    
    $tab.on("change", function(e) {
        
        idx_tab = $tab.index( $(this) );
        $tab.eq(idx_tab).addClass("on").siblings().removeClass("on");
        $tab_view.eq(idx_tab).addClass("active").siblings().removeClass("active");
        
    });
}

/* 아코디언 펑션 
    gbn_act : 1 - 다른 아코디언 닫히지 않음
    gbn_act : 2 - 다른 아코디언 닫힘
*/
function fnAcco(sel_acco_container, sel_btn_acco, sel_acco_view, arg_gbn_act) {
    
    var $acc_container  = $(sel_acco_container);
    var $btn_acco       = $(sel_btn_acco, $acc_container);
    var $acc_view       = $(sel_acco_view, $acc_container);
    var gbn_act         = arg_gbn_act || 1;
    var idx_tmp;
    
    $btn_acco.on("click", function(e){
        
        if( $(this)[0].tagName.toLowerCase() == 'a' ) {
            e.preventDefault();
        }
        
        idx_tmp = $btn_acco.index($(this));
        
            
        if ($acc_view.eq(idx_tmp).is(":visible")) {

            $btn_acco.eq(idx_tmp).removeClass("close");
            $acc_view.eq(idx_tmp).stop().slideUp();
            
        } else {
            
            if (gbn_act == 1) {
                $btn_acco.eq(idx_tmp).addClass("close");
                $acc_view.eq(idx_tmp).stop().slideDown();
            } else if (gbn_act == 2) {
                $btn_acco.eq(idx_tmp).addClass("close")
                    .end().not(":eq("+ idx_tmp +")").removeClass("close");
                $acc_view.eq(idx_tmp).stop().slideDown()
                    .end().not(":eq("+ idx_tmp +")").stop().slideUp();
            }
        }
            
    });
    
}
/*
function modal_cont01(modalLocation){

    var modal = $('<div>');
    var popupID = '#' + modalLocation;
    var popupID_height = $(popupID).height();
    var browser_height = $(window).height();
    var browser_width = $(window).width();
    var contWrap = $('.layer-pop');
    var position_top = ((browser_height-popupID_height)/2);
    var close_trigger = $('.pop-close');

    $(modal).insertAfter(popupID).slideDown().addClass('modal-overlay').css({'height' : browser_height}); 
	$(popupID).slideDown().addClass('layer-on').css({'top' : position_top});
	$('#wrapper').css({'height' : browser_height});


    function modalClose(modalLocation){
        $(modal).slideUp().remove();
        $(popupID).hide().removeClass('layer-on');
        $('#wrapper').css('height', 'auto');
    }

    $(close_trigger).on("click", function(){
        modalClose();
        return false;
    });

    return false;
};

$(document).ready(function(){
    $('.btn-modal').on('click', function(ev) {
    	ev.preventDefault();
    	ev.stopPropagation();

        var modalLocation = $(this).attr('data-modal-id');
        modal_cont01(modalLocation);

    });
});

*/