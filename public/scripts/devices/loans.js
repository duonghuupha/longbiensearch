var page = 1, keyword = '',  url = '', page_user = 1, keyword_user = '', data = [];
var keyword_device = '', page_device = 1, dateloan = '';
$(function(){
    $('#list_loan').load(baseUrl + '/loans/content');
});

function add(){
    $('#title_modal').text("Thêm mới - Cập nhật phiếu mượn thiết bị");
    $('#user_loan').val(null); $('#fullname').val(null); $('#content').val(null);
    $('#notes').val(null); $('#personel_code').focus(); $('#personel_code').attr('disabled',false);
    $('#device_code').attr('disabled',false);
    let today = new Date(); var ngay = today.getDate(), thang = (today.getMonth() + 1);
    var nam = today.getFullYear(); data = []; render_table(data);
    var hientai = ngay+'-'+thang+'-'+nam+' '+today.getHours()+':'+today.getMinutes(); $('#date_loan').datepicker('setDate', hientai);
    $('#date_return').datepicker('setDate', hientai); $('#date_loan').attr('disabled', true);
    $('#modal-loan').modal('show'); $('#select_devices').attr("disabled", false);
    $('#select_users').attr("disabled", false); $('#date_return').attr('disabled', true);
    $('#personel_code').attr('disabled', false); url = baseUrl + '/loans/add';
}

function edit(idh){
    $('#title_modal').text("Trả thiết bị"); $('#personel_code').attr('disabled', true);
    $.getJSON(baseUrl+'/loans/data_edit?id='+idh, function(data) {
        $('#user_loan').val(data.user_loan); $('#date_loan').datepicker('setDate', data.date_loan);
        $('#date_return').datepicker('setDate', data.date_return); $('#content').val(data.content);
        $('#notes').val(data.notes); $('#fullname').val(data.fullname);
        //$('#tbody').load(baseUrl + '/loans/list_device_selected?code='+data.code);
    });
    var datadc = $('#detail_'+idh).text(); data = JSON.parse(datadc); render_table_edit(data);
    $('#modal-loan').modal('show'); $('#select_devices').attr("disabled", true);
    $('#select_users').attr("disabled", true); $('#date_loan').attr('disabled', true);
    $('#date_return').attr('disabled', true);
    url = baseUrl + '/loans/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/loans/del', '#list_loan', baseUrl + '/loans/content?page='+page+'&q='+keyword);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired && data.length != 0){
        $('#datadc').val(JSON.stringify(data));
        save_form_modal('#fm', url, '#modal-loan', '#list_loan', baseUrl + '/loans/content?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Bạn chưa điền đủ thông tin");
    }
}

function view_page_loans(pages){
    page = pages;
    $('#list_loan').load(baseUrl = '/loans/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_loan').load(baseUrl + '/loans/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_loan').load(baseUrl + '/loans/content?page=1&q='+keyword);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
function select_user(){
    $('#list_users').load(baseUrl + '/loans/list_user?page='+page_user+'&q='+keyword_user+'&checked='); 
    $('#pager').load(baseUrl + '/loans/list_user_page?page='+page_user+'&q='+keyword_user);
    $('#modal-users').modal('show');
}

function view_page_user(pages){
    page_user = pages;
    $('#list_users').load(baseUrl + '/loans/list_user?page='+page_user+'&q='+keyword_user+'&checked='); 
    $('#pager').load(baseUrl + '/loans/list_user_page?page='+page_user+'&q='+keyword_user);
}

function search_user(){
    var value = $('#nav-search-input-user').val();
    if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
    $('#list_users').load(baseUrl + '/loans/list_user?page=1&q='+keyword_user+'&checked='); 
    $('#pager').load(baseUrl + '/loans/list_user_page?page=1&q='+keyword_user);
}

function selected_user(idh){
    $('#user_loan').val(idh); var fullname = $('#fullname_'+idh).text();
    $('#fullname').val(fullname); $('#personel_code').attr('disabled', true);
    $('#modal-users').modal('hide');
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function select_device(){
    dateloan = $('#date_loan').val();
    $('#list_device').load(baseUrl + '/loans/list_device?page='+page_device+'&q='+keyword_device+'&checked=&date='+dateloan); 
    $('#pager_device').load(baseUrl + '/loans/list_device_page?page='+page_device+'&q='+keyword_device);
    $('#modal-device').modal('show');
}

function view_page_device(pages){
    page_device = pages;
    $('#list_device').load(baseUrl + '/loans/list_device?page='+page_device+'&q='+keyword_device+'&checked=&date='+dateloan); 
    $('#pager_device').load(baseUrl + '/loans/list_device_page?page='+page_device+'&q='+keyword_device);
}

function search_device(){
    var value = $('#nav-search-input-device').val();
    if(value.length != 0){
        keyword_device = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_device = '';
    }
    $('#list_device').load(baseUrl + '/loans/list_device?page=1&q='+keyword_device+'&checked=&date='+dateloan); 
    $('#pager_device').load(baseUrl + '/loans/list_device_page?page=1&q='+keyword_device);
}

function confirm_device(idh){
    var value = $('#device_'+idh).val(), code = $('#code_'+idh).text(), title = $('#title_'+idh).text();
    var str = {'id': idh+'.'+value, 'code': code, 'title': title, 'sub_device': value};
    var objIndex = data.findIndex(item => item.id === idh+'.'+value);
    if(objIndex != -1){
        show_message("error", "Thiết bị đã được chọn, không thể chọn lại");
        return false;
    }else{
        data.push(str);
        render_table(data); $('#modal-device').modal('hide');
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function render_table(data_json){
    $('#tbody').empty(); var html = '', j = 1;
    for(var i = 0; i < data_json.length; i++){
        html += '<tr role="row">';
            html += '<td class="text-center">'+j+'</td>';
            html += '<td class="text-center">'+data_json[i].code+'</td>';
            html += '<td class="text-left">'+data_json[i].title+'</td>';
            html += '<td class="text-center">'+data_json[i].sub_device+'</td>';
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

function render_table_edit(data_json){
    $('#tbody').empty(); var html = '', j = 1;
    for(var i = 0; i < data_json.length; i++){
        var idh = data_json[i].id.replace(".", "");
        html += '<tr role="row">';
            html += '<td class="text-center">'+j+'</td>';
            html += '<td class="text-center">'+data_json[i].code+'</td>';
            html += '<td class="text-left">'+data_json[i].title+'</td>';
            html += '<td class="text-center">'+data_json[i].sub_device+'</td>';
            html += '<td class="text-center">';
                html += '<input id="return_'+idh+'" name="return" type="checkbox" value="'+data_json[i].id+'" onclick="return_device('+data_json[i].id+')" title="Trả thiết bị"/>';
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
//////////////////////////////////////////////////////////////////////////////////////////////////
function return_device(idh){
    var idx = idh.toString().replace(".", "");
    var value = $('#return_'+idx).prop('checked');
    var objIndex = data.findIndex(item => item.id == idh);
    if(value){
        data[objIndex].status = 1;
    }else{
        data[objIndex].status = 0;
    }
}

function set_user_loan(){
    var value = $('#personel_code').val();
    $.getJSON(baseUrl+'/other/info_personel_scan?code='+value, function(data) {
        if(data.user_id !== null){
            $('#user_loan').val(data.user_id); $('#fullname').val(data.fullname);
            $('#personel_code').val(null);
        }else{
            show_message("error", "Nhân sự này chưa được tạo tài khoản");
            $('#personel_code').val(null);
        }
    });
}

function set_device_loan(){
    var value = $('#device_code').val(), dateloan = $('#date_loan').val();
    $.getJSON(baseUrl+'/other/info_device_scan?code='+value+'&date='+dateloan, function(result) {
        if(result.total == 1){
            var str = {'id': result.record.id, 'code': result.record.code, 'title': result.record.title, 'sub_device': result.record.sub_device};
            var objIndex = data.findIndex(item => item.id === result.record.id);
            if(objIndex != -1){
                show_message("error", "Thiết bị đã được chọn, không thể chọn lại");
            }else{
                data.push(str);
                render_table(data);
            }
        }else{
            show_message("error", "Thiết bị đã được phân bổ hoặc đã được cho mượn");
        }
        $('#device_code').val(null);
    });
}

function return_device_quick(){
    var value = $('#device_return_quick').val();
    var data_str = 'code='+value;
    exec_del(data_str, baseUrl + '/loans/return_quick', '#list_loan', baseUrl + '/loans/content?page='+page+'&q='+keyword);
    $('#device_return_quick').val(null);
}

function add_reserve(){
    $('#title_modal').text("Đặt trước mượn thiết bị");
    $('#user_loan').val(null); $('#fullname').val(null); $('#content').val(null);
    $('#notes').val(null); $('#select_users').attr("disabled", true);
    $('#personel_code').attr("disabled", true); $('#device_code').attr("disabled", true);
    let today = new Date(); var ngay = today.getDate(), thang = (today.getMonth() + 1);
    var nam = today.getFullYear(); data = []; render_table(data);
    var hientai = ngay+'-'+thang+'-'+nam+' '+today.getHours()+':'+today.getMinutes(); $('#date_loan').datepicker('setDate', hientai);
    $('#date_return').datepicker('setDate', hientai); $('#modal-loan').modal('show');
    url = baseUrl + '/loans/reserve';
}

function detail(idh){
    $('#detail').load(baseUrl + '/loans/detail?id='+idh);
    $('#modal-detail').modal('show');
}

function change(idh){
    bootbox.confirm({
        message: "Vui lòng chọn đồng ý nếu duyệt mượn thiết bị, Chọn không đồng ý nếu không duyệt",
        buttons:{
            confirm: {
                label: "Đồng ý",
                className: "btn-primary btn-sm"
            },
            cancel: {
                label: "Không đồng ý",
                className: "btn-danger btn-sm"
            }
        },
        callback: function(result){
            if(result){ // dong  y
                var data_str = "id="+idh+'&status=0';
            }else{ // khong dong y
                var data_str = "id="+idh+'&status=1';
            }
            exec_del(data_str, baseUrl+'/loans/change', '#list_loan', baseUrl + '/loans/content?page='+page+'&q='+keyword);
        }
    });
}