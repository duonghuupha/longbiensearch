$(function(){
    $('.select2').select2();
    $('.date-picker').datepicker({
        autoclose: true,
        todayHighlight: true
    });
    $('#sidebar').removeClass('menu-min');
    $('.file_attach').ace_file_input({
        no_file:'Không có file ...',
        btn_choose:'Lựa chọn',
        btn_change:'Thay đổi',
        droppable:false,
        onchange:null,
        thumbnail:true
    });
    $('.input-mask-date').mask('99-99-9999');
    $('.overlay').hide();
    $("input[data-type='currency']").on({
        keyup: function() {
          formatCurrency($(this));
        }
    });
    $('#list_notify_modal').load(baseUrl + '/notify/list_notify_modal');
    ///////////////////////////////////////////////////////////////
    $.getJSON(baseUrl + '/notify/total_notify', function(data){
        //console.log(data);
        $('#total_notify').text(data);
    });
    ////////////////////////////////////////////////////////////////////
    if(url != 'index/login' && userid != 1 && is_change == 0 && url != 'profile'){
        window.location.href = baseUrl + '/profile/update_password';
    }
    //////////////////////////////////////////////////////////////////////
    setInterval(function(){
        load_total_notify();
    }, 5000);
    ///////////////////////////////////////////////////////////////////////////
});

function style_option(value){
    console.log(value.text);
}

function show_message(icon, msg){
    $.toast({
        heading: 'Thông báo',
        text: msg,
        showHideTransition: 'fade',
        icon: icon,
        position: 'top-right'
    })
}

function formatNumber(n) {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
    var input_val = input.val();
    if (input_val === "") { return; }
    var original_len = input_val.length;
    var caret_pos = input.prop("selectionStart");
    if (input_val.indexOf(".") >= 0) {
        var decimal_pos = input_val.indexOf(".");
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);
        left_side = formatNumber(left_side);
        right_side = formatNumber(right_side);
        if (blur === "blur") {
            right_side += "00";
        }
        right_side = right_side.substring(0, 2);
        input_val = left_side + "." + right_side;
    } else {
        input_val = formatNumber(input_val);
        input_val = input_val;
        if (blur === "blur") {
            input_val += ".00";
        }
    }
    input.val(input_val);
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function CurrencyFormatted(amount){
	return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str.toLowerCase();
}

function load_total_notify(){
    $.getJSON(baseUrl + '/notify/total_notify', function(data){
        //console.log(data);
        $('#total_notify').text(data);
    });
}

function reject_link(idh){
    $.getJSON(baseUrl + '/notify/readed?id='+idh, function(data){
        if(data.success){
            window.location.href = data.link;
        }else{
            window.location.href = baseUrl;
        }
    });
}

function load_list_notify(){
    $('#list_notify_modal').load(baseUrl + '/notify/list_notify_modal');
}

function format_date(str){
    var date  = new Date(str);
    var ngay = date.getDate(), thang = (date.getMonth()) + 1, nam = date.getFullYear();
    return ngay+'-'+thang+'-'+nam;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function save_reject(id_form, post_url, url_reject){
    var xhr = new XMLHttpRequest();
    var formData = new FormData($(id_form)[0]);
    $('.overlay').show();
    $.ajax({
        url: post_url,  //server script to process data
        type: 'POST',
        xhr: function() {
            return xhr;
        },
        data: formData,
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                window.location.href = url_reject;
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function save_reject_return_file(id_form, post_url, url_reject, url_file){
    var xhr = new XMLHttpRequest();
    var formData = new FormData($(id_form)[0]);
    $('.overlay').show();
    $.ajax({
        url: post_url,  //server script to process data
        type: 'POST',
        xhr: function() {
            return xhr;
        },
        data: formData,
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                window.location.href = url_reject;
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                window.open(url_file);
                return false;
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function save_form_modal(id_form, post_url, id_modal, id_content, url_refresh){
    var xhr = new XMLHttpRequest();
    var formData = new FormData($(id_form)[0]);
    $('.overlay').show();
    $.ajax({
        url: post_url,  //server script to process data
        type: 'POST',
        xhr: function() {
            return xhr;
        },
        data: formData,
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                $('.overlay').hide();
                show_message('success', result.msg);
                $(id_modal).modal('hide');
                $(id_content).load(url_refresh);
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function save_form_modal_no_refresh(id_form, post_url, id_modal){
    var xhr = new XMLHttpRequest();
    var formData = new FormData($(id_form)[0]);
    $('.overlay').show();
    $.ajax({
        url: post_url,  //server script to process data
        type: 'POST',
        xhr: function() {
            return xhr;
        },
        data: formData,
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                $('.overlay').hide();
                show_message('success', result.msg);
                $(id_modal).modal('hide');
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function save_form_reset_form(id_form, post_url, id_content, url_refresh){
    var xhr = new XMLHttpRequest();
    var formData = new FormData($(id_form)[0]);
    $('.overlay').show();
    $.ajax({
        url: post_url,  //server script to process data
        type: 'POST',
        xhr: function() {
            return xhr;
        },
        data: formData,
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                $('.overlay').hide();
                show_message('success', result.msg);
                $(id_form)[0].reset(); $('.select2').val(null).trigger('change.select2');
                $(id_content).load(url_refresh);
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function save_reject_open(id_form, post_url, url_reject){
    var xhr = new XMLHttpRequest();
    var formData = new FormData($(id_form)[0]);
    $('.overlay').show();
    $.ajax({
        url: post_url,  //server script to process data
        type: 'POST',
        xhr: function() {
            return xhr;
        },
        data: formData,
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                $('.overlay').hide();
                show_message('success', result.msg);
                window.open(url_reject);
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function del_data(str_data, notify, post_url, id_div, url_refresh){
    bootbox.confirm({
        message: notify,
        buttons:{
            confirm: {
                label: "Đồng ý",
                className: "btn-danger btn-sm"
            },
            cancel: {
                label: "Không đồng ý",
                className: "btn-primary btn-sm"
            }
        },
        callback: function(result){
            if(result){
                exec_del(str_data, post_url, id_div, url_refresh);
            }
        }
    });
}

function exec_del(data_str, url_data, id_div, url_content){
    $('.overlay').show();
    $.ajax({
        type: "POST",
        url: url_data,
        data: data_str, // serializes the form's elements.
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                $('.overlay').hide();
                show_message('success', result.msg);
                $(id_div).load(url_content);
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        }
    });
}

function update_data(str_data, notify, post_url, reject_url){
    bootbox.confirm({
        message: notify,
        buttons:{
            confirm: {
                label: "Đồng ý",
                className: "btn-danger btn-sm"
            },
            cancel: {
                label: "Không đồng ý",
                className: "btn-primary btn-sm"
            }
        },
        callback: function(result){
            if(result){
                exec_update(str_data, post_url, reject_url);
            }
        }
    });
}

function exec_update(data_str, url_data, reject_url){
    $('.overlay').show();
    $.ajax({
        type: "POST",
        url: url_data,
        data: data_str, // serializes the form's elements.
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                window.location.href = reject_url;
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        }
    });
}

function del_data_modal(str_data, notify, post_url, id_div, url_refresh, modal_id){
    bootbox.confirm({
        message: notify,
        buttons:{
            confirm: {
                label: "Đồng ý",
                className: "btn-danger btn-sm"
            },
            cancel: {
                label: "Không đồng ý",
                className: "btn-primary btn-sm"
            }
        },
        callback: function(result){
            if(result){
                exec_del_modal(str_data, post_url, id_div, url_refresh, modal_id);
            }
        }
    });
}

function exec_del_modal(data_str, url_data, id_div, url_content, modal_id){
    $('.overlay').show();
    $.ajax({
        type: "POST",
        url: url_data,
        data: data_str, // serializes the form's elements.
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                $('.overlay').hide();
                $(modal_id).modal('hide');
                show_message('success', result.msg);
                $(id_div).load(url_content);
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        }
    });
}
////////////////////////////////////////////////////////////////////////////////////////////
function combo_select_2(id, url_data, selected, title_selected){
    $(id).select2({
        ajax: {
            url: url_data,
            dataType: 'json',
            type: 'GET',
            data: function (params) {
                var queryParameters = {
                    q: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.title,
                            id: item.id,
                            disabled: item.disabled
                        }
                    })
                };
            }
        }
    });
    if(selected != 0){
        var $option = $('<option selected>'+title_selected+'</option>').val(selected);
        $(id).append($option).trigger('change');
    }
}

function combo_select_2_multiple(id, url_data, array_object){
    $(id).select2({
        multiple: true,
        ajax: {
            url: url_data,
            dataType: 'json',
            type: 'GET',
            data: function (params) {
                var queryParameters = {
                    q: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.title,
                            id: item.id,
                            disabled: item.disabled
                        }
                    })
                };
            }
        }
    });
    if(array_object.length != 0){
        for(const item of array_object){
            var $option = $('<option selected>'+item.title+'</option>').val(item.idh);
            $(id).append($option).trigger('change');
        }
    }
}

function format_content(row){
    //console.log(Object.keys(row).length);
    if(Object.keys(row).length > 3){
        var $strdata = $(
            '<div>'+row.text+'</div><div style="color:gray">'+row.content+'</div>'
        );
    }else{
        var $strdata = '';
    }
    return $strdata;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function change_year(){
    combo_select_2('#year_change_id', baseUrl + '/other/combo_years', yearid, year_title);
    $('#modal-change-year').modal('show');
}

function save_change_year(){
    var value = $('#year_change_id').val();
    if(value.length != 0){
        if($('#year_change_id').val() != yearid){
            bootbox.confirm({
                message: "Khi thay đổi năm học dữ liệu sẽ được hiển thị theo năm học bạn đã chọn. Bạn có chắc chắn muốn thay đổi năm học?",
                buttons:{
                    confirm: {
                        label: "Đồng ý",
                        className: "btn-danger btn-sm"
                    },
                    cancel: {
                        label: "Không đồng ý",
                        className: "btn-primary btn-sm"
                    }
                },
                callback: function(result){
                    if(result){
                        save_reject('#fm-change-year', baseUrl + '/index/change_year', window.location); 
                    }
                }
            });
        }else{
            show_message("error", "Không thể chuyển đến cùng năm học");
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}