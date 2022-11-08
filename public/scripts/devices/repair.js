var page = 1, keyword = '', url = '', data = [];
var dates = '', agencys = '', devices = '';
$(function(){
    $('#list_repair').load(baseUrl + '/repair/content');
    $('#table-device').animate({
        scrollTop: $('#table-device').get(0).scrollHeight
    }, 1500);
});

function add(){
    combo_select_2('#department_id', baseUrl  + '/other/combo_department_all');
    $('#file').attr('required', true); $('#date_repair').val(null); $('#agency').val(null);
    data = []; render_table(data); $('#modal-repair').modal('show');
    url = baseUrl + '/repair/add';
}

function edit(idh){
    var datadc = $('#detail_'+idh).text(); data = JSON.parse(datadc); render_table(data);
    $.getJSON(baseUrl + '/repair/data_edit?id='+idh, function(result){
        $('#code').val(result.code); $('#agency').val(result.agency); $('#file_old').val(result.file_bb);
        $('#date_repair').datepicker('setDate', result.date_repair);
    });
    $('#modal-repair').modal('show');
    url = baseUrl + '/repair/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/repair/del', '#list_repair', baseUrl + '/repair/content?page='+page+'&date='+dates+'&agency='+agencys+'&device='+devices);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true, content_required = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired && data.length != 0){
        for(const item of data){
            if(item.error.length == 0 || item.fixed.length == 0){
                content_required = false;
            }
        }
        if(content_required){
            $('#datadc').val(JSON.stringify(data));
            save_form_modal('#fm', url, '#modal-repair', '#list_repair',  baseUrl + '/repair/content?page='+page+'&date='+dates+'&agency='+agencys+'&device='+devices);
        }else{
            show_message("error", "Nội dung lỗi và khắc phục không được để trống");
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_repair(pages){
    page = pages;
    $('#list_repair').load(baseUrl + '/repair/content?page='+page+'&date='+dates+'&agency='+agencys+'&device='+devices);
}

function search(){
    var date = $('#dates').val(), agency = $('#agencys').val(), device = $('#devices').val();
    if(date.length != 0 || agency.length != 0 || device.length != 0){
        if(agency.length != 0){
            agencys = agency.replaceAll(" ", "$", 'g');
        }
        if(device.length != 0){
            devices = device.replaceAll(" ", "$", 'g');
        }
        dates = date;
    }else{
        dates = ''; agencys = ''; devices = '';
    }
    $('#list_repair').load(baseUrl + '/repair/content?page=1&date='+dates+'&agency='+agencys+'&device='+devices);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function load_device(idh){
    if(idh.length != 0){
        $('#list_device').load(baseUrl + '/repair/list_device?id='+idh);
    }
}

function selected_device(idh){
    var title = $('#title_'+idh).text(), sub = $('#sub_'+idh).text();
    var str = {'id': idh, 'sub': sub, 'title': title, 'error': '', 'fixed': ''};
    var objIndex = data.findIndex(item => item.id == idh && item.sub == sub);
    if(objIndex != -1){
        show_message("error", "Thiết bị đã được chọn, không thể chọn lại");
    }else{
        data.push(str); render_table(data);
    }
}

function render_table(data_json){
    $('#tbody').empty(); var html = '', j = 1;
    for(var i = 0; i < data_json.length; i++){
        html += '<tr role="row">';
            html += '<td class="text-center">'+j+'</td>';
            html += '<td class="text-left">'+data_json[i].title+'</td>';
            html += '<td class="text-left">';
                html += '<textarea id="error_'+data_json[i].id+'" name="error_'+data_json[i].id+'" class="form-control"';
                html += 'style="width:150px;height:50px;resize:none" onchange="change_error('+data_json[i].id+', '+data_json[i].sub+')">';
                    html += data_json[i].error;
                html += '</textarea>';
            html += '</td>';
            html += '<td class="text-left">';
                html += '<textarea id="fixed_'+data_json[i].id+'" name="fixed_'+data_json[i].id+'" class="form-control"';
                html += 'style="width:150px;height:50px;resize:none" onchange="change_fix('+data_json[i].id+', '+data_json[i].sub+')">';
                    html += data_json[i].fixed;
                html += '</textarea>';
            html += '</td>';
            html += '<td class="text-center">';
                html += '<a href="javascript:void(0)" onclick="del_selected('+data_json[i].id+', '+data_json[i].sub+')">';
                    html += '<i class="fa fa-trash" style="color:red"></i>';
                html += '</a>';
            html += '</td>';
        html += '</tr>';
        j++;
    }
    $('#tbody').append(html);
}

function change_error(idh, sub){
    var content_err = $('#error_'+idh).val();
    var objIndex = data.findIndex(item => item.id == idh && item.sub == sub);
    data[objIndex].error = content_err;
}

function change_fix(idh, sub){
    var content_fix = $('#fixed_'+idh).val();
    var objIndex = data.findIndex(item => item.id == idh && item.sub == sub);
    data[objIndex].fixed = content_fix;
}

function del_selected(idh, sub){
    data = data.filter(item => item.id != idh || item.sub != sub);
    render_table(data);
}
///////////////////////////////////////////////////////////////////////////////////////
function del_date_search(){
    $('#dates').val(null);
}