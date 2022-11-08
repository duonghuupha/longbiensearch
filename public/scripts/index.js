jQuery(function ($) {
    /////////////////////////////////////
    $(document).one('ajaxloadstart.page', function (e) {
        $tooltip.remove();
    });
})