var url = baseUrl + '/change_device/add', page = 1, keyword = '';
$(function(){
    $('#list_change').load(baseUrl + '/change_device/content');
    combo_select_2('#physical_from_id', baseUrl + '/other/combo_physical', 0, '');
    combo_select_2('#physical_to_id', baseUrl + '/other/combo_physical', 0, '');
});

function save(){
    var from = $('#physical_from_id').val(), to = $('#physical_to_id').val();
    var device = $('#device_id').val();
    if(from.length != 0 && to.length != 0 && device.length != 0){
        if(from == to){
            show_message("error", "Không thể luân chuyển thiết bị đến cùng phòng");
        }else{
            save_reject('#fm', baseUrl + '/change_device/add', baseUrl + '/change_device');
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_change(pages){
    page = pages;
    $('#list_change').load(baseUrl + '/change_device/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
    }else{
        keyword = '';
    }
    $('#list_change').load(baseUrl + '/change_device/content?page=1&q='+keyword);
}

function set_device(){
    var value = $('#physical_from_id').val();
    combo_select_2('#device_id', baseUrl + '/change_device/list_device?id='+value);
}

function check_dep_to(){
    var from_dep = $('#physical_from_id').val(), to_dep = $('#physical_to_id').val();
    if(from_dep == to_dep){
        show_message("error", "KHông thể luân chuyển thiết bị đến cùng phòng");
        $('#physical_to_id').val(null).trigger('change');
    }
}