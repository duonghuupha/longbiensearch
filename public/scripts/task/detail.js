var page = 1, url = '';
$(function(){
    $('#comment').load(baseUrl + '/tasks/list_comment?id='+id_task);
})

function add(idh){
    $('#modal-comment').modal('show');
    url = baseUrl + '/tasks/comment?id='+idh;
}

function save(type){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        if(type == 1){
            save_form_modal('#fm', url, '#modal-comment', '#comment', baseUrl + '/tasks/list_comment?page=1&id='+id_task); 
        }else{
            save_reject('#fm', baseUrl + '/tasks/finish?id='+id_task, baseUrl + '/tasks'); 
        }
    }else{
        show_message("error", "Bạn chưa điền đủ thông tin");
    }
}