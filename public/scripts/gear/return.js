var page = 1, page_gear = 1, keyword_gear = '', url = '', titles = '', statuss = 0;
$(function(){
    $('#list_return').load(baseUrl + '/gear_return/content');

});

function add(){
    $('#title_modal').text("Thêm mới - Cập nhật thông tin phiếu thu hồi đồ dùng");
    $('#content').val(null); $('#select_gears').attr('disabled', false);
    $('#utensils_id').val(null); $('#title').val(null); $('#sub_utensils').val(null);
    $('#content').attr("placeholder", "Lý do thu hồi");
    $('#modal-returns').modal('show');
    url = baseUrl + '/gear_return/add';
}

function select_gear(){
    $('#list_gear').load(baseUrl + '/gear_return/list_gear');
    $('#pager_gear').load(baseUrl + '/gear_return/list_gear_page');
    $('#modal-gear').modal('show');
}

function view_page_gear(pages){
    page_gear = pages;
    $('#list_gear').load(baseUrl + '/gear_return/list_gear?page='+page_gear+'&q='+keyword_gear);
    $('#pager_gear').load(baseUrl +'/gear_return/list_gear_page?page='+page_gear+'&q='+keyword_gear);
}

function search_gear(){
    var value = $('#nav-search-input-gear').val();
    if(value.length != 0){
        keyword_gear = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_gear = '';
    }
    $('#list_gear').load(baseUrl + '/gear_return/list_gear?page=1&q='+keyword_gear);
    $('#pager_gear').load(baseUrl +'/gear_return/list_gear_page?page=1&q='+keyword_gear);
}

function confirm_gear(idh){
    var code = $('#code_'+idh).text(), title = $('#title_'+idh).text();
    var gear = $('#gear_'+idh).val();
    $('#utensils_id').val(idh); $('#title').val(code+' - '+title);
    $('#sub_utensils').val(gear); $('#modal-gear').modal('hide');
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-returns', '#list_return', baseUrl + '/gear_return/content'); 
    }else{
        show_message("error", "Bạn chưa điền đủ thông tin");
    }
}

function search(){
    var title = $('#titles').val(), status = $('#statuss').val();
    if(title.length != 0 || status.length != 0){
        if(title.length  > 0){
            titles = title.replaceAll(" ", "$", 'g');
        }else{
            titles = '';
        }
        statuss = status;
    }else{
        titles = ''; statuss = 0;
    }
    $('#list_return').load(baseUrl + '/gear_return/content?page=1&title='+titles+'&status='+statuss);
}

function view_page_return(pages){
    page = pages;
    $('#list_return').load(baseUrl + '/gear_return/content?page='+page+'&title='+titles+'&status='+statuss);
}

function detail(idh){
    $('#modal-detail').modal('show');
}

function restore(idh){
    $('#content').val(null); $('#title_modal').text("Khôi phục đồ dùng");
    $.getJSON(baseUrl + '/gear_return/data_edit?id='+idh, function(data){
        $('#utensils_id').val(data.utensils_id); $('#title').val(data.code_utensils+' - '+data.title);
        $('#sub_utensils').val(data.sub_utensils);
    });
    $('#content').attr("placeholder", "Lý do khôi phục");
    $('#modal-returns').modal('show'); $('#select_gears').attr('disabled', true);
    url = baseUrl + '/gear_return/restore';
}