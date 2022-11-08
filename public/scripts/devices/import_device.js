var page = 1, keyword = '', url = '', keyword_device = '', page_device = 1, data = [];
$(function(){
    $('#list_import').load(baseUrl + '/import_device/content');
});

function add(){
    let today = new Date(); var ngay = today.getDate(), thang = (today.getMonth() + 1);
    var nam = today.getFullYear(), hientai = ngay+'-'+thang+'-'+nam;
    $('#date_import').datepicker('setDate', hientai); $('#source').val(null);$('#notes').val(null);
    $('#list_device').load(baseUrl + '/import_device/content_device'); $('#code').val(null);
    $('#modal-import').modal('show');
    url = baseUrl + '/import_device/add';
}

function edit(idh){
    var dateimport = $('#dateimport_'+idh).text(), source = $('#source_'+idh).text(), notes = $('#notes_'+idh).text();
    var datadc = $('#detail_'+idh).text(), code = $('#code_'+idh).text(); data = JSON.parse(datadc); render_table(data);
    $('#date_import').datepicker('setDate', dateimport); $('#source').val(source);$('#notes').val(notes);
    $('#code').val(code); $('#list_device').load(baseUrl + '/import_device/content_device');
    $('#modal-import').modal('show');
    url = baseUrl + '/import_device/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Nếu bản ghi này bị xóa đồng nghĩa tồn kho của trang thiết bị sẽ bị thay đổi. Bạn có chắc chắn muốn xóa bản ghi này ?",
            baseUrl + '/import_device/del', '#list_import', baseUrl + '/import_device?content?page='+page);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true, requiredata = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired && data.length > 0){
        for(const item of data){
            if(item.qty == 0 || item.qty == ""){
                requiredata = false;
            }
        }
        if(requiredata){
            $('#datadc').val(JSON.stringify(data));
            save_form_modal('#fm', url, '#modal-import', '#list_import',  baseUrl+'/import_device/content?page='+page+'&q='+keyword); 
        }else{
            show_message("error", "Các thiết bị được chọn phải có số lượng lớn hơn 0");
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_import(pages){
    page = pages;
    $('#list_import').load(baseUrl);
}

function search(){
    
}

function detail(idh){
    $('#detail').load(baseUrl + '/import_device/detail?id='+idh);
    $('#modal-detail').modal('show');
}
//////////////////////////////////////////////////////////////////////////////////////////////
function view_page_device(pages){
    page_device = pages;
    $('#list_device').load(baseUrl + '/import_device/content_device?page='+page_device+'&q='+keyword_device);
}

function search_device(){
    var value = $('#nav-search-device').val();
    if(value.length != 0){
        keyword_device = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_device = '';
    }
    $('#list_device').load(baseUrl + '/import_device/content_device?page=1&q='+keyword_device);
}

function selected_device(idh){
    //console.log(idh);
    var code = $('#code_'+idh).text(), title = $('#title_'+idh).text();
    var str = {'id': idh.toString(), 'code': code, 'title': title, 'qty': 0};
    var objIndex = data.findIndex(item => item.id === idh.toString());
    if(objIndex != -1){
        show_message("error", "Thiết bị đã được chọn, không thể chọn lại");
        return false;
    }else{
        data.push(str);
        render_table(data);
        $('#table-device').animate({
            scrollTop: $('#table-device').get(0).scrollHeight
        }, 1500);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function render_table(data_json){
    $('#tbody').empty(); var html = '', j = 1;
    for(var i = 0; i < data_json.length; i++){
        html += '<tr role="row">';
            html += '<td class="text-center">'+j+'</td>';
            html += '<td class="text-center">'+data_json[i].code+'</td>';
            html += '<td class="text-left">'+data_json[i].title+'</td>';
            html += '<td class="text-center">';
                html += '<input id="qty_'+data_json[i].id+'" name="qty_'+data_json[i].id+'" class="form-control"';
                html += 'size="5" value="'+data_json[i].qty+'" onkeypress="validate(event)" style="text-align:center"';
                html += 'onchange="change_data('+data_json[i].id+')"/>';
            html += '</td>';
            html += '<td class="text-center">';
                html += '<a href="javascript:void(0)" onclick="del_selected('+data_json[i].id+')">';
                    html += '<i class="fa fa-trash" style="color:red"></i>';
                html += '</a>';
            html += '</td>';
        html += '</tr>';
        j++;
    }
    $('#tbody').append(html);
}

function del_selected(idh){
    data = data.filter(item => item.id != idh);
    render_table(data);
}

function change_data(idh){
    var qty = $('#qty_'+idh).val();
    var objIndex = data.findIndex(item => item.id == idh);
    data[objIndex].qty = qty;
}