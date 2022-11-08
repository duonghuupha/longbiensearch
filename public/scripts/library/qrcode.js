var page = 1, keyword = '', data = [];
var page_cate = 1, keyword_cate=  '';
var page_manu = 1, keyword_manu = '';
$(function(){
    $('#list_library').load(baseUrl + '/lib_code/content');
});

function view_page_library(pages){
    page = pages;
    $('#list_library').load(baseUrl + '/lib_code/content?page='+page+'&q='+keyword);
    setInterval(function(){
        for(const item of data){
            $('#ck_'+item.id).prop('checked',  true);
            $('#lib_'+item.id).val(item.sub).trigger('change');
        }
    }, 200);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_library').load(baseUrl + '/lib_code/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_library').load(baseUrl + '/lib_code/content?page=1&q='+keyword);
    }
    setInterval(function(){
        for(const item of data){
            $('#ck_'+item.id).prop('checked',  true);
            $('#lib_'+item.id).val(item.sub).trigger('change');
        }
    }, 200);
}

function print_code(){
    if(data.length != 0){
        $('#datadc').val(JSON.stringify(data));
        save_reject_open('#fm', baseUrl + '/lib_code/add_code', baseUrl + '/lib_code/code');
    }else{
        show_message("error", "Không có bản ghi nào được chọn");
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function select_cate(){
    data = [];
    $('#list_cate').load(baseUrl + '/lib_code/list_cate');
    $('#pager_cate').load(baseUrl + '/lib_code/list_cate_page');
    $('#modal-cate').modal('show');
}

function view_page_cate(pages){
    page_cate = pages;
    $('#list_cate').load(baseUrl + '/lib_code/list_cate?page='+page_cate+'&q='+keyword_cate);
    $('#pager_cate').load(baseUrl + '/lib_code/list_cate_page?page='+page_cate+'&q='+keyword_cate);
    setInterval(function(){
        for(const item of data){
            $('#ckcate_'+item).prop('checked',  true);
        }
    }, 200);
}

function search_cate(){
    var value = $('#nav-search-input-cate').val();
    if(value.length != 0){
        keyword_cate = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_cate = '';
    }
    $('#list_cate').load(baseUrl + '/lib_code/list_cate?page=1&q='+keyword_cate);
    $('#pager_cate').load(baseUrl + '/lib_code/list_cate_page?page=1&q='+keyword_cate);
    setInterval(function(){
        for(const item of data){
            $('#ckcate_'+item).prop('checked',  true);
        }
    }, 200);
}

function confirm_cate(idh){
    var checked = $('#ckcate_'+idh).is(':checked');
    if(checked){
        data.push(idh);
    }else{
        data = data.filter(item => item != idh);
    }
}

function print_code_cate(){
    if(data.length != 0){
        $('#data_cate').val(JSON.stringify(data));
        save_reject_open('#fm_cate', baseUrl + '/lib_code/add_code_cate', baseUrl + '/lib_code/code_cate');
    }else{
        show_message("error", "Không có danh mục nào được chọn");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
function select_manu(){
    data = [];
    $('#list_manu').load(baseUrl + '/lib_code/list_manu');
    $('#pager_manu').load(baseUrl + '/lib_code/list_manu_page');
    $('#modal-manu').modal('show');
}

function view_page_manu(pages){
    page_manu = pages;
    $('#list_manu').load(baseUrl + '/lib_code/list_manu?page='+page_manu+'&q='+keyword_manu);
    $('#pager_manu').load(baseUrl + '/lib_code/list_manu_page?page='+page_manu+'&q='+keyword_manu);
    setInterval(function(){
        for(const item of data){
            $('#ckmanu_'+item).prop('checked',  true);
        }
    }, 200);
}

function search_manu(){
    var value = $('#nav-search-input-manu').val();
    if(value.length != 0){
        keyword_manu = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_manu = '';
    }
    $('#list_manu').load(baseUrl + '/lib_code/list_manu?page=1&q='+keyword_manu);
    $('#pager_manu').load(baseUrl + '/lib_code/list_manu_page?page=1&q='+keyword_manu);
    setInterval(function(){
        for(const item of data){
            $('#ckmanu_'+item).prop('checked',  true);
        }
    }, 200);
}

function confirm_manu(idh){
    var checked = $('#ckmanu_'+idh).is(':checked');
    if(checked){
        data.push(idh);
    }else{
        data = data.filter(item => item != idh);
    }
}

function print_code_manu(){
    if(data.length != 0){
        $('#data_manu').val(JSON.stringify(data));
        save_reject_open('#fm_manu', baseUrl + '/lib_code/add_code_manu', baseUrl + '/lib_code/code_manu');
    }else{
        show_message("error", "Không có danh mục nào được chọn");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function set_checked_lib(idh){
    var sub = $('#lib_'+idh).val(), qty = $('#qty_'+idh).val();
    var value = $('#ck_'+idh).is(':checked');
    if(value){
        if(qty != 0 && qty.length != 0){
            var str = {'id': idh, 'sub': sub, 'qty': qty};
            data.push(str);
        }else{
            show_message("error", "Số lượng tem không được để trống hoặc bằng 0");
        }
    }else{
        data = data.filter(item => item.id != idh);
    }
}

function set_select_sub_lib(idh){
    var sub = $('#lib_'+idh).val(), qty = $('#qty_'+idh).val();
    var objIndex = data.findIndex(item => item.id === idh);
    if(objIndex != -1){
        data[objIndex].sub = sub;
        data[objIndex].qty = qty;
    }else{
        var str = {'id': idh, 'sub': sub, 'qty': qty};
        data.push(str);
    }
    $('#ck_'+idh).prop('checked', true);
}

function set_qty_lib(idh){
    var objIndex = data.findIndex(item => item.id === idh);
    var qty = $('#qty_'+idh).val();
    if(qty != 0 && qty.length != 0){
        if(data.length != 0 && objIndex != -1){
            data[objIndex].qty = qty;
        }
    }else{
        show_message("error", "Số lượng tem không thể để trống hoặc bằng 0");
        $('#qty_'+idh).val(1);
    }
}