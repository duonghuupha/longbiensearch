function login(){
    var user = $('#username').val(), pass= $('#password').val();
    if(user.length != 0 || pass.length != 0){
        //save_reject('#login', baseUrl + '/index/do_login', baseUrl + '/index');
        var xhr = new XMLHttpRequest();
        var formData = new FormData($('#login')[0]);
        $.ajax({
            url: baseUrl + '/index/do_login',  //server script to process data
            type: 'POST',
            xhr: function() {
                return xhr;
            },
            data: formData,
            success: function(data){
                var result = JSON.parse(data);
                if(result.success == true){
                    if(parseInt(result.is_change) != 0 || parseInt(result.user_id) == 1){
                        window.location.href = baseUrl + '/index?token='+result.token;
                    }else{
                        window.location.href = baseUrl + '/profile/update_password';
                    }
                    localStorage.setItem('token',result.token);
                }else{
                    show_message('error', result.msg);
                    return false;
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }else{
        show_message('error', "Bạn chưa nhập đủ thông tin");
    }
}