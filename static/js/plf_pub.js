  $(document).ready(function(){
      mainBoard();
      $('.scr_list').length && $('.scr_list').scrollbar();
      selectbox();
      tooltip();
      asideMenu();
      $('.btn-etc').length && layerpopToast();
      tabSwitcher('my-tab-switching .tab .item');
      subCalendar();
      hcLayer.init();

      $('[data-toggle="datepicker"]').datepicker({
        language: 'ko-KR',
        format: 'yyyy-mm-dd'
      });
  });
  function mainBoard(){
      $(".progress-status button").click(function(){
          var idx = 0;
          if($(this).parents('.progress-status').hasClass('type2')){
            idx = $(this).parents('.item').index() + 2;
          }else{
            idx = $(this).parents('.item').index() + 1;
          }
          $('.work-status .data-table').attr('data-code', 'step' + idx);
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
  }
  function layerpopToast(){
      $(".btn-etc").click(function(){
          $(this).parent().toggleClass('active') ;
      });
  }
  
  function asideMenu(){
      $(".plf-aside .dpt1-tit").click(function(){
          $(this).toggleClass('active');
          $(this).next().slideToggle();
      });

      $(".plf-aside .depth2 li").click(function(){
          $(".plf-aside li").removeClass('selected') ;
          $(this).addClass('selected') ;
      });
  
      $(".plf-gnb .btn-menu").on('click hover', function(){
          $(".plf-aside").toggleClass('active');
      });
  }

  var tabSwitcher = function(tabSwitcherRoot) {
    var E = {};
        E.ctr = $('.' + tabSwitcherRoot);
    E.target = E.ctr.parent().next().children('.pn-con');
    
    E.ctr.each(function(n) {
        var that = $(this);
        
        that.on('click', function() {
            var idx = $(this).index();
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

  function subCalendar(){
    $(".sub_calendar_cont .day .btn-more").click(function(){
        $(this).parent().next().toggleClass('active');
    });
    $('.sub_calendar_cont').length && $('.sub_calendar_cont .scr_list').scrollbar();
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