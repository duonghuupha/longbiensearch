var page = 1, page_user = 1, keyword_user = '', page_gear = 1, keyword_gear = '', data = []. url = '';
var names = '', dateloans = '',   datereturns = '', titles =  '', dateloan = '';
$(function(){
    $('#list_loan').load(baseUrl + '/gear_loans/content');
});

function add(){
    $('#title_modal').text("Thêm mới - Cập nhật phiếu mượn đồ dùng"); $('#content').val("Minh họa cho nội dung bài học");
    $('#select_users').attr("disabled", false); $('#date_loan').attr('disabled', false); $('#select_devices').attr("disabled", false);
    $('#user_loan').val(null); $('#fullname').val(null); $('#notes').val(null); 
    $('#personel_code').focus(); $('#personel_code').attr('disabled',false);
    $('#gear_code').attr('disabled',false); data = []; render_table(data);
    let today = new Date(); var ngay = today.getDate(), thang = (today.getMonth() + 1);
    var nam = today.getFullYear(); data = []; render_table(data);
    var hientai = ngay+'-'+thang+'-'+nam+' '+today.getHours()+':'+today.getMinutes(); 
    $('#date_loan').datepicker('setDate', hientai); $('#date_return').attr('disabled', true);
    $('#date_return').datepicker('setDate', hientai); $('#date_loan').attr('disabled', true);
    $('#modal-loan').modal('show'); url = baseUrl + '/gear_loans/add';
}

function edit(idh){
    $('#title_modal').text("Trả đồ dùng"); $('#personel_code').attr('disabled', true);
    $.getJSON(baseUrl + '/gear_loans/data_edit?id='+idh, function(data){
        $('#user_loan').val(data.user_loan); $('#date_loan').datepicker('setDate', data.date_loan);
        $('#date_return').datepicker('setDate', data.date_return); $('#content').val(data.content);
        $('#notes').val(data.notes); $('#fullname').val(data.fullname);
    });
    var datadc = $('#detail_'+idh).text(); data = JSON.parse(datadc); render_table_edit(data);
    $('#modal-loan').modal('show'); $('#select_devices').attr("disabled", true);
    $('#select_users').attr("disabled", true); $('#date_loan').attr('disabled', true);
    $('#date_return').attr('disabled', true); 
    $('#modal-loan').modal('show'); url = baseUrl + '/gear_loans/update?id='+idh;
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
        save_form_modal('#fm', url, '#modal-loan', '#list_loan', baseUrl + '/gear_loans/content?page='+page+'&name='+names+'&title='+titles+'&date_loan='+dateloans+'&date_return='+datereturns); 
    }else{
        show_message("error", "Bạn chưa điền đủ thông tin");
    }
}

function view_page_loan(pages){
    page = pages;
    $('#list_loan').load(baseUrl + '/gear_loans/content?page='+page+'&name='+names+'&title='+titles+'&date_loan='+dateloans+'&date_return='+datereturns);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function select_user(){
    $('#list_users').load(baseUrl + '/gear_loans/list_user');
    $('#pager').load(baseUrl +'/gear_loans/list_user_page');
    $('#modal-users').modal('show');
}

function view_page_users(pages){
    page_user = pages;
    $('#list_users').load(baseUrl + '/gear_loans/list_user?page='+page_user+'&q='+keyword_user);
    $('#pager').load(baseUrl +'/gear_loans/list_user_page?page='+page_user+'&q='+keyword_user);
}

function search_user(){
    var value = $('#nav-search-input-user').val();
    if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
    $('#list_users').load(baseUrl + '/gear_loans/list_user?page=1&q='+keyword_user);
    $('#pager').load(baseUrl +'/gear_loans/list_user_page?page=1&q='+keyword_user);
}

function confirm_user(idh){
    $('#user_loan').val(idh); $('#fullname').val($('#fullname_'+idh).text());
    $('#modal-users').modal('hide');
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
function select_gear(){
    dateloan = $('#date_loan').val();
    $('#list_gear').load(baseUrl + '/gear_loans/list_gear?date='+dateloan);
    $('#pager_gear').load(baseUrl + '/gear_loans/list_gear_page');
    $('#modal-gear').modal('show');
}

function view_page_gear(pages){
    page_gear = pages;
    $('#list_gear').load(baseUrl + '/gear_loans/list_gear?page='+page_gear+'&q='+keyword_gear+'&date='+dateloan);
    $('#pager_gear').load(baseUrl +'/gear_loans/list_gear_page?page='+page_gear+'&q='+keyword_gear);
}

function search_gear(){
    var value = $('#nav-search-input-gear').val();
    if(value.length != 0){
        keyword_gear = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_gear = '';
    }
    $('#list_gear').load(baseUrl + '/gear_loans/list_gear?page=1&q='+keyword_gear+'&date='+dateloan);
    $('#pager_gear').load(baseUrl +'/gear_loans/list_gear_page?page=1&q='+keyword_gear);
}

function confirm_gear(idh){
    var value = $('#gear_'+idh).val(), code = $('#code_'+idh).text(), title = $('#title_'+idh).text();
    var str = {'id': idh+'.'+value, 'code': code, 'title': title, 'sub_utensils': value};
    var objIndex = data.findIndex(item => item.id === idh+'.'+value);
    if(objIndex != -1){
        show_message("error", "Đồ dùng đã được chọn, không thể chọn lại");
        return false;
    }else{
        data.push(str);
        render_table(data); $('#modal-gear').modal('hide');
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
            html += '<td class="text-center">'+data_json[i].sub_utensils+'</td>';
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
            html += '<td class="text-center">'+data_json[i].sub_utensils+'</td>';
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
/////////////////////////////////////////////////////////////////////////////////////////////////
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

function search(){
    var name = $('#fullnames').val(), title = $('#titles').val();
    var dateloan = $('#date_loan_s').val(), datereturn = $('#date_return_s').val();
    if(name.length != 0 || title.length != 0  || dateloan.length != 0 || datereturn.length != 0){
        dateloans = dateloan; datereturns = datereturn;
        if(title.length  > 0){
            titles = title.replaceAll(" ", "$", 'g');
        }else{
            titles = '';
        }
        if(name.length  > 0){
            names = name.replaceAll(" ", "$", 'g');
        }else{
            names = '';
        }
    }else{
        names = ''; titles = ''; dateloans = ''; datereturns = '';
    }
    $('#list_loan').load(baseUrl + '/gear_loans/content?page=1&name='+names+'&title='+titles+'&date_loan='+dateloans+'&date_return='+datereturns);
}

function del_date_loan(){
    $('#date_loan_s').datepicker('setDate', '');
}

function del_date_return(){
    $('#date_return_s').datepicker('setDate', '');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function set_user_loan(){
    var value =   $('#personel_code').val();
    $.getJSON(baseUrl + '/other/info_personel_scan?code='+value, function(result){
        $('#user_loan').val(result.user_id); $('#fullname').val(result.fullname);
    });
    $('#personel_code').val(null);
}

function set_gear_loan(){
    var value = $('#gear_code').val(); dateloan = $('#date_loan').val();
    $.getJSON(baseUrl  + '/gear_loans/info_gear?data='+value+'&date='+date, function(result){
        if(result.success == true){
            show_message("success", result.msg);
            var str = {'id': result.id+'.'+result.sub, 'code': result.code, 'title': result.title, 'sub_utensils': result.sub};
            var objIndex = data.findIndex(item => item.id === result.id+'.'+result.sub);
            if(objIndex != -1){
                show_message("error", "Đồ dùng đã được chọn, không thể chọn lại");
                return false;
            }else{
                data.push(str); render_table(data); $('#gear_code').val(null);
            }
        }else{
            show_message("error", result.msg);
            return false;
        }
    });
}

function detail(idh){
    $('#detail').load(baseUrl + '/gear_loans/detail?id='+idh);
    $('#modal-detail').modal('show');
}

function change(idh){
    bootbox.confirm({
        message: "Vui lòng chọn đồng ý nếu duyệt mượn đồ dùng, Chọn không đồng ý nếu không duyệt",
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
            exec_del(data_str, baseUrl+'/gear_loans/change', '#list_loan', baseUrl + '/gear_loans/content?page=1&name='+names+'&title='+titles+'&date_loan='+dateloans+'&date_return='+datereturns);
        }
    });
}