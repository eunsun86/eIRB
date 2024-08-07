$(document).ready(function(){
    mainBoard(); //메인 게시판
    accordionCheckbox(); //메뉴권한 설정
    $('.scr_list').length && scrollFc(); //디자인 스크롤바
    selectbox();
    tooltip();
    asideMenu();
    $('.btn-etc').length && layerpopToast(); //토스트 팝업
    tabSwitcher('my-tab-switching .tab .item'); //탭
    subCalendar(); //심의일정
    datepickerKr();
    $(".datepicker1").length && datepicker();
    foldertree(); //평가표관리
    groupmanage() //그룹관리
    hcLayer.init(); //레이어팝업
});

function mainBoard(){
    $(".progress-status button").click(function(){
        var idx = 0;
        if($(this).parents('.progress-status').hasClass('type3')){
          idx = $(this).parents('.item').index() + 4;
        }else if($(this).parents('.progress-status').hasClass('type2')){
          idx = $(this).parents('.item').index() + 2;
        }else{
          idx = $(this).parents('.item').index() + 1;
        }
        $('.work-status .srl-table-head').attr('data-code', 'step' + idx);
    });
}

function accordionCheckbox(){
    $(".dpt1 .ip-ch").each(function(){
        if($(this).is(':checked')){
            $(this).parent().next().removeAttr('style')
            $(this).parent().next().slideDown();
            $(this).parent().next().find('label input:checkbox').prop('checked',true);
        }else{
            $(this).parent().next().slideUp();
        }
    });
    $(".dpt1 .ip-ch").click(function(){
        if($(this).is(':checked')){
            $(this).parent().next().slideDown();
            $(this).parent().next().find('label input:checkbox').prop('checked',true);
        }else{
            $(this).parent().next().slideUp();
            $(this).parent().next().find('label input:checkbox').prop('checked',false);
        }
    });
    $(".ip-ch-group .ip-ch").change(function(){
        var totalLgt = $(this).parents(".ip-ch-group").find('label input:checkbox').length,
            lgt = $(this).parents(".ip-ch-group").find('label input:checkbox:checked').length;
        if($(this).is(':checked')){
            if(totalLgt == lgt){
                $(this).parents("li").find(".dpt1 .ip-ch").prop('checked',true);
            }
        }else{
            if(totalLgt !== lgt){
                $(this).parents("li").find(".dpt1 .ip-ch").prop('checked',false);
            }
        }
    });
    $(".acco-item").each(function(){
        if($(this).hasClass('open')){
            $(this).children('.acco-con').slideDown();
        }else{
            $(this).children('.acco-con').slideUp();
        }
    });
    $(".acco-ctr").click(function(){
        $(this).parent().toggleClass('open');
        if($(this).parent().hasClass('open')){
            $(this).next().slideDown();
        }else{
            $(this).next().slideUp();
        }
    });
    $(".btn-acco").click(function(){
        $(this).parent().parent().toggleClass('open');
        if($(this).parent().parent().hasClass('open')){
            $(this).parent().next().slideDown();
        }else{
            $(this).parent().next().slideUp();
        }
    });
}

function scrollFc() {
    $('.scr_list').each(function () {
        $(this).scrollbar();
    });
}

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

    $(document).mouseup(function (e){
        var LayerPopup = $(".tooltip");
        if(LayerPopup.has(e.target).length === 0){
            $(this).find('.tooltip-con').removeClass('active') ;
        }
    });
}

function layerpopToast() {
    $(".btn-etc").click(function () {
        $(this).parent().toggleClass('active');
    });
}
  
function asideMenu() {
    $(".plf-aside .dpt1-tit").click(function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    });
    $(".plf-aside .depth2 li").click(function () {
        $(".plf-aside li").removeClass('selected');
        $(this).addClass('selected');
    });

    $(".plf-gnb .btn-menu").on('mouseover', function () {
        $(".plf-aside").toggleClass('active');
    });
    $(".plf-aside").on('mouseleave', function () {
        $(".plf-aside").removeClass('active');
    });
}

var tabSwitcher = function (tabSwitcherRoot) {
    var E = {};
    E.ctr = $('.' + tabSwitcherRoot);
    E.target = E.ctr.parent().next().children('.pn-con');

    E.ctr.each(function (n) {
        var that = $(this);

        that.on('click', function () {
            var idx = $(this).index();
            that.siblings().removeClass('active');
            that.addClass('active');
            if (that.parent().next().hasClass('tab-con-group')) {
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

function subCalendar() {
    $(".sub_calendar_cont .day .btn-more").click(function () {
        $(this).parent().next().toggleClass('active');
        $(this).hide();
    });
}

function popupExplain(param) {
    var html = document.getElementById(param).innerHTML;
    var w = window.open('./00_iframe.html?data=' + html, 'popup', 'top=10, left=10, width=1400, height=900, location=no, directories=no, status=no, menubar=no, toolbar=no, resizable=no');
}

function datepickerKr() {
    $('[data-toggle="datepicker"]').datepicker({
        language: 'ko-KR',
        format: 'yyyy-mm-dd'
    });
}

function datepicker() {
    // mark 날짜
	var reqularDates = ["2024-06-11", "2024-05-15", "2024-06-13"]; // 정규심의 날짜
	var fastDates = ["2024-06-11", "2024-06-04", "2024-06-05"]; // 신속심의 날짜

	function available(date) {

		var thismonth = date.getMonth()+1;
		var thisday = date.getDate();

		if(thismonth<10){
			thismonth = "0"+thismonth;
		}

		if(thisday<10){
			thisday = "0"+thisday;
		}

		ymd = date.getFullYear() + "-" + thismonth + "-" + thisday;

        if ($.inArray(ymd, reqularDates) >= 0 && $.inArray(ymd, fastDates) >= 0) {
			return [true,"reqular fast"];
		} else if ($.inArray(ymd, reqularDates) >= 0) {
			return [true,"reqular"];
		}  else if ($.inArray(ymd, fastDates) >= 0) {
			return [true,"fast"];
		} else {
			return [true,""];
		}
 	}

	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		//	minDate: '-7',	// 일주일 이전 날짜 선택 못하게
		//	maxDate: '1',	// 하루 이후 날짜 선택 못하게

		beforeShowDay: available,	// mark 표시

		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '.',

		showOn: 'both', //	button,both : "button" ->button 클릭 시 날짜 위젯을 보여준다. "both" => button이나 text상자 클릭 시 날짜 위젯을 보여준다.
		buttonImage: '../static/img/icon/ic_pagi.svg',  // 우측 달력 icon 의 이미지 패스
		buttonImageOnly: true, // true이면 입력 필드 옆에 이미지만 표시됩니다. false이면 버튼 안에 이미지가 표시됩니다. inputbox 뒤에 달력icon만 표시한다. ('...' 표시생략)
	});
    $(".datepicker1").datepicker();
}

function foldertree() {
    $(".folder_tree .submenu_open").on("click", function () {
        
        if(!$(this).parent().hasClass('last')){
            $(this).toggleClass("on");
        }
        
    });
    $(".folder_tree li button").on("click", function () {
        $(".folder_tree li").removeClass("on");
        $(this).parent().addClass("on");
    });
}

function groupmanage() {
    $(".group-manage .data-table tr").on("click", function () {
        $(".group-manage .data-table tr").removeClass("on");
        $(this).addClass("on");
    });
}

window.hcLayer = {
    init: function () {
        this.closeBtnEvent();
    },
    closeBtnEvent: function (e) {
        $(document).on('click', '[data-dismiss="modal"]', function (e) {
            e.preventDefault();
            var thisLayer = $(this).closest('.layer');
            hcLayer.hideEvent(thisLayer);
        })
    },
    show: function (target) {
        var showLayer = $('#' + target),
            showLayerLeft = ($(window).width() - showLayer.outerWidth(true)) / 2,
            showLayerTop = ($(window).height() - showLayer.outerHeight(true)) / 2;

        if ($(window).height() <= showLayer.outerHeight(true)) {
            showLayerTop = 0;
        }
        showLayer.css({
            'left': showLayerLeft,
            'top': showLayerTop
        }).show();
        $('body').append('<span class="dim"></span>');
    },
    hide: function (target) {
        var hideLayer = $('#' + target);
        this.hideEvent(hideLayer);
    },
    hideEvent: function (target) {
        target.hide();
        $('.dim').hide();
    }
}