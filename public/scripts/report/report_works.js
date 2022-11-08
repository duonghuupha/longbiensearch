var page = 1, sgroup = '', scate = '', stitle = '';
$(function(){
    $('#list_works').load(baseUrl+'/report_works/content');
});

function filter(){
    $('#sgroup').load(baseUrl + '/other/combo_works_group');
    $('#modal-search').modal('show');
}

function search(){
    var sgroup = $('#sgroup').val().length != 0 ? $('#sgroup').val() : '';
    var scate = $('#scate').val() != null ? $('#scate').val() : '';
    var stitle = $('#stitle').val().length != 0 ? $('#stitle').val().replaceAll(" ", "$", 'g') : '';
    $('#list_works').load(baseUrl+'/report_works/content?page=1&group='+sgroup+'&cate='+scate+'&title='+stitle);
    $('#modal-search').modal('hide');
}

function view_page_works(pages){
    page = pages;
    $('#list_works').load(baseUrl+'/report_works/content?page='+page+'&group='+sgroup+'&cate='+scate+'&title='+stitle);
}

function print_works(){
    window.open(baseUrl+'/report_works/print_works?group='+sgroup+'&cate='+scate+'&title='+stitle);
}

function set_cate(){
    var value = $('#sgroup').val();
    $('#scate').load(baseUrl + '/other/combo_works_cate?id='+value);
}

function del_group(){
    $('#sgroup').val('').trigger('change');
}

function del_cate(){
    $('#scate').val('').trigger('change');
}