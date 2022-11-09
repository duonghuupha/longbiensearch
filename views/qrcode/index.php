<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Trang tra cứu thông tin :: Trường THCS Long Biên</title>
    <link href="<?php echo URL.'/styles/'; ?>css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo URL.'/styles/'; ?>css/result.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo URL.'/styles/' ?>css/jquery.toast.css">
    <script src="<?php echo URL.'/styles/'; ?>js/jquery-1.10.2.min.js"></script>
    <script>
        var baseUrl = '<?php echo URL ?>';
        var type = <?php echo $this->type ?>;
    </script>
</head>
<body>
<div class="container-fluid m-0 bg-secondary">
    <div class="row">
        <div class="col-lg-12 card-margin">
            <nav class="navbar navbar-expand-lg">
                <div class="collapse navbar-collapse" id="mainNavigation">
                    <a href="<?php echo URL ?>" class="px-2 homepage-menu">
                        <img src="<?php echo URL.'/styles/' ?>img/Logo.png" width="168" height="28" class="d-inline-block align-top" 
                        alt="Kênh tra cứu thông tin của trường THCS Long Biên">
                    </a>
                </div>
            </nav>
            <div class="card search-form">
                <div class="card-body p-0">
                    <div id="search-form">
                        <div class="row no-gutters">
                            <div class="col-lg-11 col-md-11 col-sm-10 col-10">
                                <input type="text" placeholder="Từ khóa..." class="form-control" id="search-input" name="search"
                                value="<?php echo isset($_REQUEST['q']) ? str_replace("+", " ", $_REQUEST['q']) : '' ?>" onchange="search()">
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-2 col-2">
                                <button type="button" class="btn btn-base" onclick="search()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card card-margin">
                <div class="card-body">
                    <div class="row search-body">
                        <div class="col-lg-12">
                            <div class="search-result">
                                <div class="result-body">
                                    <h1 class="h3 mb-3">Thông tin chi tiết</h1>
                                    <div class="row" id="noidung">
                                        <script type="text/javascript">
                                            $(function(){
                                                if(type == 1){
                                                    $('#noidung').load(baseUrl + '/qrcode/proof?data=<?php echo $_REQUEST['data'] ?>')
                                                }else if(type == 2){
                                                    $('#noidung').load(baseUrl + '/qrcode/works?data=<?php echo $_REQUEST['data'] ?>')
                                                }
                                            });
                                        </script>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?php echo URL.'/styles/'; ?>js/bootstrap.min.js"></script>
<script src="<?php echo URL ?>/styles/js/jquery.toast.js"></script>
<script>
    function search(){
        var skey = $('#search-input').val();
        if(skey.length != 0){
            var keyword = skey.replaceAll(" ", "+", 'g')
            window.location.href = baseUrl + '/result?page=1&q='+keyword;
        }else{
            $.toast({
                heading: 'Thông báo',
                text: "Hãy nhập nội dung tìm kiếm",
                showHideTransition: 'fade',
                icon: 'warning',
                position: 'top-right'
            });
        }
    }
</script>
</body>
</html>