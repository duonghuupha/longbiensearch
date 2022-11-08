var page = 1, codes = '', titles = '', cates = '', url = '', data = [];
$(function(){
    $('#list_gear').load(baseUrl + '/gear_code/content');
    //$('#cate_s').load(baseUrl + '/other/combo_utensils');
    combo_select_2('#cate_s', baseUrl + '/other/combo_utensils');
});

function view_page_gear(pages){
    page = pages;
    $('#list_gear').load(baseUrl + '/gear_code/content?page='+page+'&code='+codes+'&title='+titles+'&cate='+cates);
    setInterval(function(){
        for(const item of data){
            $('#ck_'+item.id).prop('checked',  true);
            $('#gear_'+item.id).val(item.sub).trigger('change');
        }
    }, 200);
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
    $('#list_gear').load(baseUrl + '/gear_code/content?page=1&code='+codes+'&title='+titles+'&cate='+cates);
    setInterval(function(){
        for(const item of data){
            $('#ck_'+item.id).prop('checked',  true);
            $('#gear_'+item.id).val(item.sub).trigger('change');
        }
    }, 200);
}

function print_code(){
    if(data.length != 0){
        $('#datadc').val(JSON.stringify(data));
        save_reject_open('#fm', baseUrl + '/gear_code/add_code', baseUrl + '/gear_code/code');
    }else{
        show_message("error", "Không có bản ghi nào được chọn");
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function set_checked_gear(idh){
    var sub = $('#gear_'+idh).val(), qty = $('#qty_'+idh).val();
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

function set_select_sub_gear(idh){
    var sub = $('#gear_'+idh).val(), qty = $('#qty_'+idh).val();
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

function set_qty_gear(idh){
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