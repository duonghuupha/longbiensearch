var page_quanlity = 1, page_standard = 1, page_criteria = 1, page_role = 1, url = '';
$(function(){
    $('#list_quanlity').load(baseUrl + '/quanlity_cate/content_quanlity');
    $('#list_standard').load(baseUrl + '/quanlity_cate/content_standard');
    $('#list_criteria').load(baseUrl + '/quanlity_cate/content_criteria');
    $('#quanlity_id').load(baseUrl + '/other/combo_quanlity');
    $('#quanlity_id_').load(baseUrl + '/other/combo_quanlity');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function add_quanlity(){
    $('#form').load(baseUrl + '/quanlity_cate/form_quanlity');
    $('#modal-form').modal('show');
    url = baseUrl + '/quanlity_cate/add_quanlity';
}

function edit_quanlity(idh){
    $('#form').load(baseUrl + '/quanlity_cate/form_quanlity?id='+idh);
    $('#modal-form').modal('show');
    url = baseUrl + '/quanlity_cate/update_quanlity?id='+idh;
}

function del_quanlity(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/quanlity_cate/del_quanlity', '#list_quanlity', baseUrl + '/quanlity_cate/content_quanlity?page='+page_quanlity);
}

function save_quanlity(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-form', '#list_quanlity',  baseUrl+'/quanlity_cate/content_quanlity?page='+page_quanlity); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_quanlity(pages){
    page_quanlity = pages;
    $('#list_quanlity').load(baseUrl + '/quanlity_cate/content_quanlity?page='+page_quanlity);
}

function change_quanlity(status, idh){
    if(status == 0){
        show_message("error", "Giai đoạn kiểm định bắt buộc phải có một bản ghi được kích hoạt");
        return false;
    }else{
        var data_str = "id="+idh+'&status='+status;
        del_data(data_str, "Giai đoạn kiểm định chỉ được kích hoạt 1 bản ghi. Bạn có chắc chắn muốn cập nhật trạng thái bản ghi này?", baseUrl + '/quanlity_cate/change_quanlity', '#list_quanlity', baseUrl + '/quanlity_cate/content_quanlity?page='+page_quanlity);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function add_standard(){
    $('#title_standard').val(null); $('#quanlity_id').val(null).trigger('change');
    $('#modal-standard').modal('show');
    url = baseUrl + '/quanlity_cate/add_standard';
}

function edit_standard(idh){
    var title = $('#titlestandard_'+idh).text(); $('#title_standard').val(title);
    var quanlity = $('#quanlityid_'+idh).text(); $('#quanlity_id').val(quanlity).trigger('change');
    $('#modal-standard').modal('show');
    url = baseUrl + '/quanlity_cate/update_standard?id='+idh;
}

function del_standard(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/quanlity_cate/del_standard', '#list_standard', baseUrl + '/quanlity_cate/content_standard?page='+page_standard);
}

function save_standard(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm-standard', url, '#modal-standard', '#list_standard',  baseUrl+'/quanlity_cate/content_standard?page='+page_standard); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_standard(pages){
    page_standard = pages;
    $('#list_standard').load(baseUrl + '/quanlity_cate/content_standard?page='+page_standard);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function add_criteria(){
    $('#quanlity_id_').val(null).trigger('change'); $('#title_criteria').val(null);
    $('#st_old').hide(); $('#standard_id').attr('required', true); 
    $('#standard_id').val(null).trigger('change');
    $('#modal-criteria').modal('show');
    url = baseUrl + '/quanlity_cate/add_criteria';
}

function edit_criteria(idh){
    var quanlity = $('#quanlityid_'+idh).text(); $('#quanlity_id_').val(quanlity).trigger('change');
    var title = $('#titlecriteria_'+idh).text(); $('#title_criteria').val(title);
    var standard = $('#standardid_'+idh).text(); $('#standard_id').val(standard).trigger('change');
    $('#standard_id').attr('required', false); $('#st_old').show(); $('#standard_old').val(standard);
    var stold = $('#standard_'+idh).text(); $('#st_old').html(" - <b><i>"+stold+"</i></b>");
    $('#modal-criteria').modal('show');
    url = baseUrl + '/quanlity_cate/update_criteria?id='+idh;
}

function del_criteria(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/quanlity_cate/del_criteria', '#list_criteria', baseUrl + '/quanlity_cate/content_criteria?page='+page_criteria);
}

function save_criteria(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm-criteria', url, '#modal-criteria', '#list_criteria',  baseUrl+'/quanlity_cate/content_criteria?page='+page_criteria); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_criteria(pages){
    page_criteria = pages;
    $('#list_criteria').load(baseUrl + '/quanlity_cate/content_criteria?page='+page_criteria);
}

function set_standard(){
    var value = $('#quanlity_id_').val();
    $('#standard_id').load(baseUrl + '/other/combo_standard?id='+value);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
