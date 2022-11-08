var page = 1;
$(function(){
    $('#list_notify').load(baseUrl + '/notify/content');
});

function view_page_notify(pages){
    page = pages;
    $('#list_notify').load(baseUrl + '/notify/content?page='+page);
}

function del_notify(){
    let myArray = (function() {
        let a = [];
        $(".ck_inma:checked").each(function() {
            a.push(this.value);
        });
        return a;
    })()
    if(myArray.length > 0){
        //window.open(baseUrl + '/qrcode_device/print_code?data='+btoa(myArray.join(",")));
        var data_str = "data="+btoa(myArray.join(","));
        del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi ?", baseUrl + '/notify/del', '#list_notify', baseUrl + '/notify/content?page='+page);
    }else{
        show_message('error', 'Không có bản ghi nào được chọn');
        return false;
    }
}

function read_notify(){
    let myArray = (function() {
        let a = [];
        $(".ck_inma:checked").each(function() {
            a.push(this.value);
        });
        return a;
    })()
    if(myArray.length > 0){
        //window.open(baseUrl + '/qrcode_device/print_code?data='+btoa(myArray.join(",")));
        var data_str = "data="+btoa(myArray.join(","));
        del_data(data_str, "Bạn có chắc chắn muốn cập nhật trạng thái cho bản ghi ?", baseUrl + '/notify/change', '#list_notify', baseUrl + '/notify/content?page='+page);
    }else{
        show_message('error', 'Không có bản ghi nào được chọn');
        return false;
    }
}