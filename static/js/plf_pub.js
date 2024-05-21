/*퍼블리싱 전용 JS*/

/*
  Aside 메뉴 ---------------------------------------------------
*/
// 정의
var asideToggle = function(asideToggleRoot) {
  var E = {};
  E.root = $('.' + asideToggleRoot);
  E.ctr = E.root.find('.d1>li');
  //E.target = E.root.find('.d1 .d2');
  E.ctr.each(function(n) {
    var nb = n;
    var that = $(this);
    that.on('click', function () {
      if (!that.hasClass('active')) {
        that.addClass('active');
      } else { 
        that.removeClass('active');
      }
    })
  });
};
// 호출
$(document).ready(function() {
  asideToggle('iucp-aside');
});

/*
  Accordion ---------------------------------------------------
*/
// 정의
var acco = function(accoRoot) {
  var E = {};
  E.root = $('.' + accoRoot);
  //E.item = E.root.find('.item');
  E.ctr = E.root.find('.my-acco-ctr');
  E.target = E.root.find('.my-acco-con');
  E.ctr.each(function(n) {
    var nb = n;
    var that = $(this);
    that.on('click', function() {
      if (!that.parent('.my-acco').hasClass('active')) {
        that.parent('.my-acco').addClass('active');
      } else {
        that.parent('.my-acco').removeClass('active');
      }
    })
  });
};
// 호출
$(document).ready(function() {
  acco('my-acco');
});

/*
  Datepicker ---------------------------------------------------
*/
// 호출
$(document).ready(function () {
  $('[data-toggle="datepicker"]').datepicker({
    language: 'ko-KR',
    format: 'yyyy-mm-dd'
  });
});

/*
  TabSwitch ---------------------------------------------------
*/
// 정의
var tabSwitcher = function(tabSwitcherRoot) {
    var E = {};
    
    // E.root = $('.' + tabSwitcherRoot);
    // E.ctr = E.root.find('.tab .item');
    // E.target = E.root.find('.pn-con-group .pn-con');

    E.ctr = $('.' + tabSwitcherRoot);
    // E.ctr.css('border','1px solid red')
    // E.ctr.parent().next().children('.pn-con').css('border','1px solid green')
    E.target = E.ctr.parent().next().children('.pn-con');
    
    E.ctr.each(function(n) {
        // var nb = n;
        var that = $(this);
        
        that.on('click', function() {
            // E.ctr.removeClass('active');
            // that.addClass('active');
            // E.target.removeClass('active');
            // E.target.eq(nb).addClass('active');

            var idx = $(this).index();
            //console.log(idx)
            that.siblings().removeClass('active');
            that.addClass('active');
            if(that.parent().next().hasClass('tab-con-group')){
                that.parent().next().children('.tab-con').removeClass('active');
                that.parent().next().children('.tab-con').eq(idx).addClass('active');
            }
            that.parent().next().children('.pn-con').removeClass('active');
            that.parent().next().children('.pn-con').eq(idx).addClass('active');
            that.parent().next().children('.sec-con').removeClass('active');
            that.parent().next().children('.sec-con').eq(idx).addClass('active');
            
        })
    });
};
// 호출
$(document).ready(function() {
    tabSwitcher('my-tab-switching .tab .item');
});

$(document).ready(function(){
    selectbox();
    tooltip();
	asideMenu();
	$('.btn-etc').length && layerpopToast();
  hcLayer.init();
});
function selectbox(){
    var thisSelect
    $(document).on('click', '.fs_selected', function(){
        thisSelect = $(this).parent();
        if(thisSelect.hasClass('readonly')){
            return false;
        }
        if($('.form_selectbox.open').not($(this).parent()).length){
            $('.form_selectbox.open').removeClass('open')
        }
        thisSelect.toggleClass('open')
    })
    $(document).on('click', '.fs_list li button', function(){
        console.log(111)
        thisSelect.find('.fs_selected').text($(this).text()).attr('data-selected-value', $(this).attr('data-value'));
        thisSelect.removeClass('open')
    })
    $('.fs_selected').focusout(function(){
        var thisBtn = $(this)
        setTimeout(function(){
            thisBtn.parent().removeClass('open')
        },100)
    })
}
function tooltip(){
	$(".btn-tooltip").click(function(){
        $(this).next().toggleClass('active') ;
    });
}
function layerpopToast(){
	$(".btn-etc").click(function(){
        $(this).parent().toggleClass('active') ;
    });
}

function asideMenu(){
	$(".plf-aside .depth2 li").click(function(){
        $(".plf-aside li").removeClass('selected') ;
        $(this).addClass('selected') ;
    });

    $(".plf-gnb .btn-menu").on('click hover', function(){
        $(".plf-aside").toggleClass('active');
        // $(this).show();
    });
}

window.hcLayer = {
    init:function(){
        this.closeBtnEvent();
    },
    closeBtnEvent:function(e){
        $(document).on('click', '[data-dismiss="modal"]', function(e){
            e.preventDefault();
            var thisLayer = $(this).closest('.layer');
            hcLayer.hideEvent(thisLayer);
        })
    },
    show:function(target){
        var showLayer = $('#' + target),
        showLayerLeft = ($(window).width() - showLayer.outerWidth(true)) / 2,
        showLayerTop = ($(window).height() - showLayer.outerHeight(true)) / 2;

        if($(window).height() <= showLayer.outerHeight(true)){
            showLayerTop = 0;
        }
        showLayer.css({'left':showLayerLeft, 'top': showLayerTop}).show();
        $('body').append('<span class="dim"></span>');
    },
    hide:function(target){
        var hideLayer = $('#' + target);
        this.hideEvent(hideLayer);
    },
    hideEvent:function(target){
        target.hide();
        $('.dim').hide();
    }
}