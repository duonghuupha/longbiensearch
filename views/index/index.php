<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Trang tìm kiếm thông tin :: Trường THCS Long Biên</title>
    <link rel="stylesheet" href="<?php echo URL.'/styles/' ?>css/vendor.css">
    <link rel="stylesheet" href="<?php echo URL.'/styles/' ?>css/iconfinder.css">
    <link rel="stylesheet" href="<?php echo URL.'/styles/' ?>css/carbon_ads.css">
    <link rel="stylesheet" href="<?php echo URL.'/styles/' ?>css/landing.css">
    <link rel="stylesheet" href="<?php echo URL.'/styles/' ?>css/blog.css">
    <script>
        var baseUrl = '<?php echo URL ?>';
    </script>
</head>

<body class="homepage preview-white">
    <nav class="navbar navbar-expand-lg navbar-light bg-white ">
        <div class="collapse navbar-collapse" id="mainNavigation">
            <a href="javascript:void(0)" class="px-2 homepage-menu">
                <img src="<?php echo URL.'/styles/' ?>img/Logo.png" width="168" height="28" class="d-inline-block align-top" 
                alt="Kênh tra cứu thông tin của trường THCS Long Biên">
            </a>
        </div>
    </nav>
    <header data-toggle="navigation-sticky">
        <div class="container-fluid container-max-width py-5">
            <div class="row">
                <div class="col-12">
                    <div class="rounded-lg mt-5 banner-1">
                        <div class="row">
                            <div class="col-10 offset-1 col-xl-8 offset-xl-2 text-center">
                                <h1 class="display-2 text-dark">
                                    Long Bien search
                                </h1>
                                <p class="lead text-dark mb-4 opacity-70">
                                    Trường THCS Long Biên luôn mang đến điều tốt nhất tới học sinh, hãy cùng khám phá
                                </p>
                                <form method="post" class="search-form form-autocomplete focus">
                                    <div class="input-group input-group-lg">
                                        <input id="search-input" class="form-control border-0 autocomplete" type="text"
                                        name="q" placeholder="Tìm văn bản, sách điện tử và nhiều hơn nữa...."
                                        value="" autocomplete="off" maxlength="256" onchange="search()">
                                        <div class="input-group-append">
                                            <button type="button" class="btn btn-submit" onclick="search()">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" 
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                                                stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <script src="js/jquery-1.10.2.min.js"></script>
    <script>
        function search(){
            var value = $('#search-input').val();
            if(value.length == 0){

            }else{
                var keyword = value.replaceAll(" ", "+", 'g');
                window.location.href = baseUrl + '/result?q='+keyword;
            }
        }
    </script>
</body>
</html>