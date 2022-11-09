<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Trang tra cứu thông tin :: Trường THCS Long Biên</title>
    <link href="<?php echo URL.'/styles/'; ?>css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo URL.'/styles/'; ?>css/result.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo URL.'/styles/' ?>css/jquery.toast.css">
    <script>
        var baseUrl = '<?php echo URL ?>';
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
    <?php
    $array = [1 => 'Minh chứng kiểm định chất lượng', 2 => 'Hồ sơ công việc', 3 => 'Văn bản đến', 4 => 'Văn bản đi',
    5 => 'Thư viện - Sách', 6 => 'Trang thiết bị', 7 => 'Đồ dùng học tập'];
    $item = $this->jsonObj; $sql = new Model();
    ?>
    <div class="row">
        <div class="col-lg-12">
            <div class="card card-margin">
                <div class="card-body">
                    <div class="row search-body">
                        <div class="col-lg-12">
                            <div class="search-result">
                                <div class="result-body">
                                    <h1 class="h3 mb-3">Thông tin chi tiết</h1>
                                    <div class="row">
                                        <div class="col-md-4 col-xl-3">
                                            <div class="card mb-3">
                                                <div class="card-header">
                                                    <h5 class="card-title mb-0" style="font-size:15px;">
                                                        <?php echo $array[$this->type] ?>
                                                    </h5>
                                                </div>
                                                <div class="card-body">
                                                    <h5 class="h6 card-title">Thông tin</h5>
                                                    <ul class="list-unstyled mb-0">
                                                        <li class="mb-1">
                                                            <b>Tiêu đề:</b><br/>
                                                            <span><?php echo $item[0]['title'] ?></span>
                                                        </li>
                                                        <li class="mb-1">
                                                            <b>Mã tài liệu:</b><br/>
                                                            <span><?php echo $item[0]['code'] ?></span>
                                                        </li>
                                                        <li class="mb-1">
                                                            <b>Mã hóa minh chứng:</b><br/>
                                                            <span><?php echo $item[0]['code_proof'] ?></span>
                                                        </li>
                                                        <li class="mb-1">
                                                            <b>Giai đoạn kiểm định:</b><br/>
                                                            <span><?php echo $item[0]['title'] ?></span>
                                                        </li>
                                                        <li class="mb-1">
                                                            <b>Tiêu chuẩn:</b><br/>
                                                            <span><?php echo $item[0]['title'] ?></span>
                                                        </li>
                                                        <li class="mb-1">
                                                            <b>Tiêu chí:</b><br/>
                                                            <span><?php echo $item[0]['criteria'] ?></span>
                                                        </li>
                                                        <li class="mb-1">
                                                            <b>Người tạo:</b><br/>
                                                            <span><?php echo $item[0]['title'] ?></span>
                                                        </li>
                                                        <li class="mb-1">
                                                            <b>Cập nhật lần cuối:</b><br/>
                                                            <span><?php echo date("H:i:s d-m-Y", strtotime($item[0]['create_at'])) ?></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8 col-xl-9">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h5 class="card-title mb-0">Chi tiết</h5>
                                                </div>
                                                <div class="card-body h-100">
                                                    <?php
                                                    if($this->type == 1){
                                                        if($item[0]['file'] != ''){
                                                            $url = URL_FILE.'/proof_quanlity/'.$item[0]['criteria_id'].'/'.$item[0]['file'];
                                                        }else{
                                                            $file = explode("_",  $item[0]['file_link']);
                                                            if($file[1] == 1){ // document in
                                                                $detail = $sql->get_info_document_in($file[0]);
                                                                $url = URL_FILE.'/document_in/'.$detail[0]['cate_id'].'/'.$detail[0]['file'];
                                                            }else{ // document out
                                                                $detail = $sql->get_info_document_out($file[0]);
                                                                $url = URL_FILE.'/document_out/'.$detail[0]['cate_id'].'/'.$detail[0]['file'];
                                                            }
                                                        }
                                                    ?>
                                                    <iframe src="<?php echo $url ?>" scrolling="auto" width="100%" height="500" 
                                                    style="border:none"></iframe>
                                                    <?php
                                                    }
                                                    ?>
                                                    <!--<div class="media">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" width="36" height="36" class="rounded-circle mr-2" alt="Kathy Davis">
                                                        <div class="media-body">
                                                            <small class="float-right text-navy">5m ago</small>
                                                            <strong>Kathy Davis</strong> started following <strong>Marie Salter</strong>
                                                            <br>
                                                            <small class="text-muted">Today 7:51 pm</small>
                                                            <br>

                                                        </div>
                                                    </div>
                                                    <hr>
                                                    <div class="media">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" width="36" height="36" class="rounded-circle mr-2" alt="Andrew Jones">
                                                        <div class="media-body">
                                                            <small class="float-right text-navy">30m ago</small>
                                                            <strong>Andrew Jones</strong> posted something on <strong>Marie Salter</strong>'s timeline
                                                            <br>
                                                            <small class="text-muted">Today 7:21 pm</small>

                                                            <div class="border text-sm text-muted p-2 mt-1">
                                                                Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.
                                                            </div>

                                                            <a href="#" class="btn btn-sm btn-danger mt-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart feather-sm">
                                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                                </svg> Like</a>
                                                        </div>
                                                    </div>
                                                    <hr>-->
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
        </div>
    </div>
</div>
<script src="<?php echo URL.'/styles/'; ?>js/jquery-1.10.2.min.js"></script>
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