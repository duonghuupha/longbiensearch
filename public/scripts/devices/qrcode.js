var page = 1; keyword = '', data_dep = [], data = [];
$(function(){
    $('#list_device').load(baseUrl + '/qrcode_device/content');
});

function view_page_devices(pages){
    page = pages;
    $('#list_device').load(baseUrl + '/qrcode_device/content?page='+page+'&q='+keyword);
    setInterval(function(){
        for(const item of data){
            $('#ck_'+item.id).prop('checked',  true);
            $('#device_'+item.id).val(item.sub).trigger('change');
        }
    }, 200);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_device').load(baseUrl + '/qrcode_device/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_device').load(baseUrl + '/qrcode_device/content?page=1&q='+keyword);
    }
    setInterval(function(){
        for(const item of data){
            $('#ck_'+item.id).prop('checked',  true);
            $('#device_'+item.id).val(item.sub).trigger('change');
        }
    }, 200);
}
////////////////////////////////////////////////////////////////////////////////////////////////
function selected_device(idh){
    var value = $('#ck_'+idh).is(':checked');
    if(value){
        var sub = $('#device_'+idh).val(), qty = $('#qty_'+idh).val();
        if(sub.length != 0){
            var str = {'id': idh, 'sub': sub, 'qty': qty};
            data.push(str);
        }else{
            $('#ck_'+idh).prop('checked', false);
            show_message("error", "Bạn phải chọn số con của thiết bị trước")
        }
    }else{
        data = data.filter(item => item.id != idh);
    }
}

function set_select_sub_device(idh){
    var sub = $('#device_'+idh).val(), qty = $('#qty_'+idh).val();
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

function set_qty(idh){
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

function print_allcode(){
    if(data.length != 0){
        $('#datadc').val(JSON.stringify(data));
        save_reject_open('#fm', baseUrl + '/qrcode_device/add_code', baseUrl + '/qrcode_device/code');
    }else{
        show_message("error", "Không có bản ghi nào được chọn");
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////
function view_device_dep(){
    combo_select_2('#dep_id', baseUrl + '/other/combo_department_all');
    data_dep= []; $('#modal-dep').modal('show');
}

function load_device_dep (){
    var value = $('#dep_id').val();
    $('#list_dep').load(baseUrl + '/qrcode_device/content_dep?id='+value);
}

function selected_device_dep(idh){
    var value = $('#ck_dep_'+idh).is(':checked');
    if(value){
        var sub = $('#sub_'+idh).text(), qty = $('#qty_dep_'+idh).val();
        var str = {'id': idh, 'sub': sub, 'qty': qty};
        data_dep.push(str);
    }else{
        data_dep = data_dep.filter(item => item.id != idh);
    }
}

function set_qty_dep(idh){
    var objIndex = data_dep.findIndex(item => item.id === idh);
    var qty = $('#qty_dep_'+idh).val();
    if(qty != 0 && qty.length != 0){
        if(data_dep.length != 0 && objIndex != -1){
            data_dep[objIndex].qty = qty;
        }
    }else{
        show_message("error", "Số lượng tem không thể bỏ trống hoặc bằng 0");
        $('#qty_dep_'+idh).val(1);
    }
}

function print_code_dep(){
    if(data_dep.length != 0){
        $('#datadc_dep').val(JSON.stringify(data_dep));
        save_reject_open('#fm-dep', baseUrl + '/qrcode_device/add_code_dep', baseUrl + '/qrcode_device/code_dep');
    }else{
        show_message("error", "Không có bản ghi nào được chọn");
    }
}