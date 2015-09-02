(function ($) {
  
  $( document ).on( "mobileinit", function() {
    $.extend( $.mobile , {
      defaultPageTransition: 'slide'
    });
  });
  
  $(document).on( "ready", function(e) {
     var jspApi = $('.scroll-pane').jScrollPane({autoReinitialise: true});
  });
  
  $(document).on( "click", '.ui-footer .toggle-link.close', function(e) {
    e.preventDefault();
    var footerHeight = $(this).parent().height();
    $(this).parent().animate({'bottom':'-'+footerHeight+'px'});
    $(this).removeClass('close').addClass('open');
    

    if ($('.ui-page-active').attr('id') == 'iChoiceGasStationsPageView'
        || $('.ui-page-active').attr('id') == 'iChoiceTrcPageView') 
    {
      var itemsListHeight = $('.ui-content .list-items').height();
      $('.ui-content .list-items').height(itemsListHeight + footerHeight);
    }
  });
  
  $(document).on( "click", '.ui-footer .toggle-link.open', function(e) {
    e.preventDefault();
    var footerHeight = $(this).parent().height();
    $(this).parent().animate({'bottom':0});
    $(this).removeClass('open').addClass('close');
    

    if ($('.ui-page-active').attr('id') == 'iChoiceGasStationsPageView'
        || $('.ui-page-active').attr('id') == 'iChoiceTrcPageView') 
    {
      var itemsListHeight = $('.ui-content .list-items').height();
      $('.ui-content .list-items').height(itemsListHeight - footerHeight);
    }
  });
  
  $(document).on( "click", '.ui-footer .ui-link', function(e) {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });
  
  $(document).on( "click", '.tabs a', function(e) {
    e.preventDefault();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    
    $('.cBasketForm .tab-content').hide();
    $('.cBasketForm #iFuelValueAndFundsDesc .desc-item').hide();
    $('.cBasketForm #iFuelValueAndFundsLogo .item-logo').hide();
    
    if ($(this).attr('id') == 'iFuelValueTab') {
      $('.cBasketForm .tab-content#iFuelValueTabContent').show();
      $('.cBasketForm #iFuelValueAndFundsDesc .desc-item#iFuelValueDesc').show();
      $('.cBasketForm #iFuelValueAndFundsLogo .item-logo#euro5LogoImage').show();
    }
    else if ($(this).attr('id') == 'iFundsTab') {
      $('.cBasketForm .tab-content#iFundsTabContent').show();
      $('.cBasketForm #iFuelValueAndFundsDesc .desc-item#iFundsDesc').show();
      $('.cBasketForm #iFuelValueAndFundsLogo .item-logo#rubLogoImage').show();
    }
  });

})(jQuery);