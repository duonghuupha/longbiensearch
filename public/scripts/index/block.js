$(function(){
    $('#block_one').load(baseUrl + '/dashboard/block_one');
    $('#block_two').load(baseUrl + '/dashboard/block_two?id=1');
    $('#block_three').load(baseUrl + '/dashboard/block_three?id=2');
    $('#block_four').load(baseUrl + '/dashboard/block_four');
    $('#block_five').load(baseUrl + '/dashboard/block_five');
    $('#department_schedule').load(baseUrl + '/other/combo_department?yearid='+yearid);
});

function reload_block_two(value){
    $('#block_two').load(baseUrl + '/dashboard/block_two?id='+value);
}

function reload_block_three(value){
    $('#block_three').load(baseUrl + '/dashboard/block_three?id='+value);
}

function set_data_schedule(){
    var value = $('#department_schedule').val();
    $('#block_four').load(baseUrl + '/dashboard/block_four?id='+value);
}