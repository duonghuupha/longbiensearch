var page = 1, keyword = '', data = [];
var codes = '', names = '', dates = '', departments = '', addresss = '', genders = 0, peoples = '';
var religions = 0;
$(function(){
    $('#list_student').load(baseUrl + '/student/content_card');
});

function view_page_student(pages){
    page = pages;
    var checked = $('#data_check').val();
    $('#list_student').load(baseUrl + '/student/content_card?code='+codes+'&name='+names+'&date='+dates+'&class='+departments+'&address='+addresss+'&gender='+genders+'&people='+peoples+'&religion='+religions+'&page='+pages+'&checked='+checked);
}

function print_card(){
    var checked = $('#data_check').val();
    if(checked.length > 0){
        window.location.href = baseUrl + '/student/print_card?data='+checked;
    }else{
        show_message('error', 'Không có bản ghi nào được chọn');
        return false;
    }
}

function save(){
    var data = $('#datadc').val(); var data_str = "data="+data;
    //window.open(baseUrl + '/personal/print_print_card?data='+data);
    $('.overlay').show();
    $.ajax({
        type: "POST",
        url: baseUrl + '/student/download_card',
        data: data_str, // serializes the form's elements.
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                $('.overlay').hide();
                show_message('success', result.msg);
                window.open(baseUrl+'/public/card/tmp/the_hoc_sinh.zip');
                // xoa du lieu the khi xuat file thanh cong
                del_card();
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        }
    });
}


function filter(){
    $('#sdepartment').load(baseUrl + '/other/combo_department?yearid='+yearid);
    $('#speople').load(baseUrl + '/other/combo_people');
    $('#modal-search').modal('show');
}

function del_speople(){
    $('#speople').val(null).trigger('change');
}

function del_sdepartment(){
    $('#sdepartment').val(null).trigger('change');
}

function search_adv(){
    var checked = $('#data_check').val();
    var code= $('#scode').val(), name = $('#sfullname').val(), date = $('#sbirthday').val();
    var classid = $('#sdepartment').val(), address = $('#saddress').val(), gender = $('#sgender').val();
    var peolpe = $('#speople').val(), religion = $('#sreligion').val();
    if(code.length != 0 || name.length != 0 || date.length != 0 || classid.length != 0 || address.length != 0
        || gender != 0 || peolpe.length != 0 || religion != 0){
        if(name.length != 0){
            names = name.replaceAll(" ", "$", 'g');
        }
        if(address.length != 0){
            addresss = address.replaceAll(" ", "$", 'g');
        }
        codes = code; dates = date; departments = classid; genders = gender; 
        peoples = peolpe; religions = religion;
    }else{
        codes = ''; dates = ''; departments = ''; names = ''; addresss = ''; genders = 0; peoples =  '';
        religions = 0;
    }
    $('#modal-search').modal('hide');
    $('#list_student').load(baseUrl + '/student/content_card?code='+codes+'&name='+names+'&date='+dates+'&class='+departments+'&address='+addresss+'&gender='+genders+'&people='+peoples+'&religion='+religions+'&page=1&checked='+checked);
}

function del_card(){
    $.ajax({
        type: "POST",
        url: baseUrl + '/student/del_card',
        data: '', // serializes the form's elements.
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                show_message('success', result.msg);
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        }
    });
}