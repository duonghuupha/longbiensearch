var page = 1, keyword = '';
$(function(){
    $('#list_personel').load(baseUrl + '/personal/content_card');
});

function view_page_personal(pages){
    $('#list_personel').load(baseUrl + '/personal/content_card?page='+page+'&q='+keyword);;
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_personel').load(baseUrl + '/personal/content_card?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_personel').load(baseUrl + '/personal/content_card?page=1&q='+keyword);
    }
}

function save(){
    let myArray = (function() {
        let a = [];
        $(".ck_inma:checked").each(function() {
            //var qty = $('#qty_'+this.value).val();
            a.push(this.value);
        });
        return a;
    })()
    if(myArray.length > 0){
        window.location.href = baseUrl + '/personal/print_card?data='+btoa(myArray.join(","));
    }else{
        show_message('error', 'Không có bản ghi nào được chọn');
        return false;
    }
}

function print_card(){
    var data = $('#datadc').val(); var data_str = "data="+data;
    //window.open(baseUrl + '/personal/print_print_card?data='+data);
    $('.overlay').show();
    $.ajax({
        type: "POST",
        url: baseUrl + '/personal/print_print_card',
        data: data_str, // serializes the form's elements.
        success: function(data){
            var result = JSON.parse(data);
            if(result.success == true){
                $('.overlay').hide();
                show_message('success', result.msg);
                //$(id_div).load(url_content);
                window.open(baseUrl+'/public/card/tmp/the_nhan_su.zip');
                // xoa fiel the sau khi xuat thanh cong
                del_card();
            }else{
                $('.overlay').hide();
                show_message('error', result.msg);
                return false;
            }
        }
    });
}

function del_card(){
    $.ajax({
        type: "POST",
        url: baseUrl + '/personal/del_card',
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