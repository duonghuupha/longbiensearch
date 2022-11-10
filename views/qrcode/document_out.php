<?php
$array = [1 => 'Minh chứng kiểm định chất lượng', 2 => 'Hồ sơ công việc', 3 => 'Văn bản đến', 4 => 'Văn bản đi',
5 => 'Thư viện - Sách', 6 => 'Trang thiết bị', 7 => 'Đồ dùng học tập'];
$item = $this->jsonObj; $sql = new Model();
?>
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
                    <b>Danh mục:</b><br/>
                    <span><?php echo $item[0]['category'] ?></span>
                </li>
                <li class="mb-1">
                    <b>Số văn bản:</b><br/>
                    <span><?php echo $item[0]['number_dc'] ?></span>
                </li>
                <li class="mb-1">
                    <b>Ngày văn bản:</b><br/>
                    <span><?php echo date("d-m-Y",  strtotime($item[0]['date_dc'])) ?></span>
                </li>
                <li class="mb-1">
                    <b>Nơi nhận:</b><br/>
                    <span><?php echo $item[0]['location_to'] ?></span>
                </li>
                <li class="mb-1">
                    <b>Người tạo:</b><br/>
                    <span><?php echo $item[0]['fullname'] ?></span>
                </li>
                <li class="mb-1">
                    <b>Cập nhật lần cuối:</b><br/>
                    <span><?php echo date("H:i:s d-m-Y",  strtotime($item[0]['create_at'])) ?></span>
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
            $url = URL_FILE.'/document_out/'.$item[0]['cate_id'].'/'.$item[0]['file'];
            ?>
            <iframe src="<?php echo $url ?>" scrolling="auto" width="100%" height="500" 
            style="border:none"></iframe>
        </div>
    </div>
</div>