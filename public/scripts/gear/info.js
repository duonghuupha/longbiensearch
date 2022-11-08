var page = 1, codes = '', titles = '', cates = '', url = '';
$(function(){
    $('#list_gear').load(baseUrl + '/gear/content');
    //$('#cate_id').load(baseUrl + '/other/combo_utensils');
    $('#cate_s').load(baseUrl + '/other/combo_utensils');
});

function add(){
    var number = Math.floor(Math.random() * 99999999);
    $('#code').val(number); $('#title').val(null);
    combo_select_2('#cate_id', baseUrl + '/other/combo_utensils', 0, '');
    $('#cate_id').val(null).trigger('change'); $('#content').val(null);
    $('#stock').val(0); $('#stock').attr('readonly', false);
    $('#modal-gear').modal('show');
    url = baseUrl + '/gear/add';
}

function edit(idh){
    $.getJSON(baseUrl + '/gear/data_edit?id='+idh, function(data){
        $('#code').val(data.code); $('#title').val(data.title);
        combo_select_2('#cate_id', baseUrl + '/other/combo_utensils', data.cate_id, data.category);
        $('#image_old').val(data.image); $('#content').val(data.content);
        $('#stock').val(data.stock);
        if(data.stock != 0){
            $('#stock').attr('readonly', true);
        }else{
            $('#stock').attr('readonly', false);
        }
    });
    $('#modal-gear').modal('show');
    url = baseUrl + '/gear/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/gear/del', "#list_gear", baseUrl + '/gear/content?page='+page+'&code='+codes+'&title='+titles+'&cate='+cates);
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
        save_form_modal('#fm', url, '#modal-gear', '#list_gear',  baseUrl+'/gear/content'); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_gear(pages){
    page = pages;
    $('#list_gear').load(baseUrl + '/gear/content?page='+page+'&code='+codes+'&title='+titles+'&cate='+cates);
}

function search(){
    var code= $('#codes').val(), title = $('#titles').val(), cate = $('#cate_s').val();
    if(code.length != 0 || title.length != 0 || cate.length != 0){
        if(title.length != 0){
            titles = title.replaceAll(" ", "$", 'g');
        }
        codes = code; cates = cate;
    }else{
        codes = ''; titles = ''; cates = '';
    }
    $('#list_gear').load(baseUrl + '/gear/content?page=1&code='+codes+'&title='+titles+'&cate='+cates);
}
////////////////////////////////////////////////////////////////
function detail(idh){
    $('#detail').load(baseUrl + '/gear/detail?id='+idh);
    $('#modal-detail').modal('show');
}

function del_cate(){
    $('#cate_s').val(null).trigger('change');
}

function import_gear(){
    window.location.href = baseUrl + '/gear/import';
}